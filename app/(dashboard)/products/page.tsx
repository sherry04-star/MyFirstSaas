"use client";
import { useState, useEffect } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import AddProductModal from "@/components/AddProductModal";
import { createClient } from "@/utils/supabase/client";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supabase = createClient();

  // Data Fetch Karna
  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔴 NAYA FUNCTION: Product Delete Karna
  const handleDelete = async (id: string, name: string) => {
    // Pehle user se confirm karein taake ghalti se delete na ho
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    // Database se delete ki command
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      // Delete hone ke baad list ko foran refresh karein
      fetchProducts();
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "All Categories" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const getStatus = (stock: number) => {
    if (stock > 10) return { label: "Active", color: "bg-emerald-500/10 text-emerald-500" };
    if (stock > 0) return { label: "Low Stock", color: "bg-amber-500/10 text-amber-500" };
    return { label: "Out of Stock", color: "bg-rose-500/10 text-rose-500" };
  };

  return (
    <>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Products</h1>
          <p className="text-slate-400 mt-1">Manage your store's inventory and product listings.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#1e293b] border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All Categories">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Apparel">Apparel</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading products from database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-[#0f172a] border border-slate-800 rounded-xl">
            <p className="text-slate-400">No products found. Click "Add Product" to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const status = getStatus(product.stock);
              return (
                <div key={product.id} className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group">
                  <div className="aspect-video bg-slate-800 relative overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-medium text-blue-500 mb-1 uppercase tracking-wider">{product.category}</p>
                        <h3 className="font-semibold text-white line-clamp-1">{product.name}</h3>
                      </div>
                      <button className="text-slate-400 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-800/50">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Stock: {product.stock}</p>
                        <p className="text-lg font-bold text-white">${product.price.toFixed(2)}</p>
                      </div>

                      {/* 🔴 NAYE BUTTONS: Delete aur Edit */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          title="Delete Product"
                          className="p-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          title="Edit Product"
                          className="p-2 bg-slate-800/50 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchProducts()}
      />
    </>
  );
}