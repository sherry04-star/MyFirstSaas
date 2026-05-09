"use client";
import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid"; // Naya tool for unique names

export default function AddProductModal({ isOpen, onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", price: "", category: "Electronics", stock: "", description: ""
  });

  const supabase = createClient();

  if (!isOpen) return null;

  // Tasweer select karne ka function
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Preview dikhane ke liye URL banayein
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = "";

      // Agar user ne tasweer select ki hai toh pehle usay Supabase mein daalein
      if (imageFile) {
        // Tasweer ko ek unique naam dein
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `product-images/${fileName}`; // Folder ka naam

        // Supabase bucket mein upload
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Upload ke baad us tasweer ka public link (URL) mangwayen
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      // Ab baqi product data aur naya image URL database mein save karein
      const { error: dbError } = await supabase.from("products").insert([
        {
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          stock: parseInt(formData.stock),
          description: formData.description,
          image_url: finalImageUrl, // Yahan naya asil URL jayega
        },
      ]);

      if (dbError) throw dbError;

      alert("Product added successfully!");
      setFormData({ name: "", price: "", category: "Electronics", stock: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
      onSuccess();
      onClose();

    } catch (error: any) {
      alert("Error adding product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">

        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-[#1e293b]/50">
          <h2 className="text-xl font-bold text-white">Add New Product</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 p-2 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 🔴 NAYA HISSA: Image Upload Area */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Product Image</label>
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 transition-colors bg-slate-800/50 group overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center p-6 text-slate-400 group-hover:text-blue-400">
                {imagePreview ? (
                  <div className="w-full h-40 relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-800 p-3 rounded-full mb-3 group-hover:bg-blue-500/20">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium">Click or drag image here</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-400">Product Name *</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Wireless Earbuds" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-400">Category *</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Apparel">Apparel</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-400">Price ($) *</label>
              <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="0.00" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-400">Initial Stock *</label>
              <input required type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="0" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-400">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Brief details about the product..." />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
              {loading ? (
                <> <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Uploading... </>
              ) : (
                <> <Upload className="w-4 h-4" /> Save Product & Image </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}