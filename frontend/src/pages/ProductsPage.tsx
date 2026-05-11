import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import type { Producto } from '../store/productStore';
import { useCategoryStore } from '../store/categoryStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { Plus, Pencil, Trash2, Search, Image as ImageIcon, ChevronLeft, ChevronRight, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const ProductsPage = () => {
  const { productos, total, isLoading, fetchProductos, createProducto, updateProducto, deleteProducto } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [formData, setFormData] = useState({ 
    nombre: '', 
    descripcion: '', 
    precio: 0, 
    stock: 0, 
    imagen: '',
    categoriaId: 0
  });

  useEffect(() => {
    fetchProductos(page, limit);
    fetchCategories();
  }, [fetchProductos, fetchCategories, page, limit]);

  const handleOpenModal = (product: Producto | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ 
        nombre: product.nombre, 
        descripcion: product.descripcion, 
        precio: product.precio, 
        stock: product.stock,
        imagen: product.imagen || '',
        categoriaId: product.categoriaId || (categories[0]?.id || 0)
      });
    } else {
      setEditingProduct(null);
      setFormData({ 
        nombre: '', 
        descripcion: '', 
        precio: 0, 
        stock: 0, 
        imagen: '',
        categoriaId: categories[0]?.id || 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProducto(editingProduct.id, formData);
        toast.warning('Producto actualizado exitosamente', {
          description: `Se han guardado los cambios para ${formData.nombre}`,
          action: { label: 'Cerrar', onClick: () => {} }
        });
      } else {
        await createProducto(formData);
        toast.success('Nuevo producto añadido', {
          description: `${formData.nombre} ya está disponible en el inventario`,
          action: { label: 'Cerrar', onClick: () => {} }
        });
      }
      setIsModalOpen(false);
    } catch {
      toast.error('Error en la operación');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProducto(id);
        toast.error('Producto eliminado', {
          description: 'El producto ha sido removido del sistema permanentemente',
          action: { label: 'Cerrar', onClick: () => {} }
        });
      } catch {
        toast.error('Error al eliminar');
      }
    }
  };

  const handleExport = () => {
    const headers = ['Nombre', 'Precio', 'Stock', 'Categoría'];
    const csvData = productos.map(p => [
      p.nombre,
      p.precio,
      p.stock,
      p.categoriaNombre || 'Sin categoría'
    ].join(','));
    
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inventario_${new Date().toLocaleDateString()}.csv`);
    link.click();
    toast.success('Inventario exportado', { description: 'El archivo CSV ha sido generado correctamente.' });
  };

  const filteredProducts = productos.filter((p) => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.categoriaId === Number(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between bg-slate-900/40 p-8 rounded-3xl border border-white/10 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase">Inventario</h2>
          <p className="text-slate-400 font-medium">Gestión avanzada de existencias y catálogo.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport} className="h-14 px-6 text-lg font-bold border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl transition-all gap-3 text-white">
            <Download className="h-6 w-6" /> Exportar
          </Button>
          <Button onClick={() => handleOpenModal()} className="h-14 px-8 text-lg font-bold premium-gradient rounded-2xl shadow-blue-500/20 shadow-2xl hover:scale-105 active:scale-95 transition-all gap-3">
            <Plus className="h-6 w-6" /> Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 z-10" />
          <Input
            placeholder="Buscar por nombre..."
            className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 rounded-xl w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-slate-500" />
          <select 
            className="h-12 bg-white/5 border border-white/10 text-white rounded-xl px-4 focus:outline-none focus:border-blue-500 w-full md:w-48"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all" className="bg-slate-900">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id} className="bg-slate-900">{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Mostrar:</span>
          <select 
            className="h-12 bg-white/5 border border-white/10 text-white rounded-xl px-4 focus:outline-none focus:border-blue-500"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10} className="bg-slate-900">10 filas</option>
            <option value={20} className="bg-slate-900">20 filas</option>
          </select>
        </div>
      </div>

      {/* Grid Section */}
      {isLoading ? (
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <Spinner className="h-12 w-12" />
          <p className="text-slate-400 animate-pulse font-medium">Actualizando inventario...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={product.id}
              >
                <Card className="overflow-hidden group border-white/10 bg-slate-900/40 hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col shadow-lg">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="h-48 relative overflow-hidden">
                       <img 
                        src={product.imagen} 
                        alt={product.nombre} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                       />
                       <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-slate-900/80 backdrop-blur-md" onClick={() => handleOpenModal(product)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="destructive" size="icon" className="h-8 w-8 rounded-lg bg-red-500/80 backdrop-blur-md" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                       </div>
                       <div className="absolute bottom-2 left-2">
                          <Badge variant={product.stock > 0 ? 'success' : 'destructive'} className="text-[10px] px-2 py-0.5">
                            {product.stock > 0 ? `${product.stock} STOCK` : 'AGOTADO'}
                          </Badge>
                       </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-4">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{product.categoriaNombre}</span>
                        <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors uppercase leading-tight">{product.nombre}</h3>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xl font-black text-white">${product.precio}</span>
                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <ImageIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button 
              variant="outline" 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5 mr-2" /> Anterior
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-10 w-10 rounded-xl font-bold transition-all ${
                    page === i + 1 ? 'premium-gradient text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button 
              variant="outline" 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)}
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              Siguiente <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </>
      )}

      {/* Modal Section */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'MODIFICAR PRODUCTO' : 'NUEVO PRODUCTO'}
        className="max-w-2xl bg-[#0f172a] border-white/10"
      >
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nombre</label>
              <Input
                placeholder="Nombre del producto"
                className="bg-slate-950 border-white/10 text-white h-12 rounded-xl"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Precio</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Categoría</label>
              <select 
                className="w-full h-12 bg-slate-950 border border-white/10 text-white rounded-xl px-4 focus:outline-none focus:border-blue-500"
                value={formData.categoriaId}
                onChange={(e) => setFormData({ ...formData, categoriaId: Number(e.target.value) })}
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-slate-900">{cat.nombre}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Stock Inicial</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="bg-slate-950 border-white/10 text-white h-12 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">URL de la Imagen</label>
            <Input
              placeholder="https://images.unsplash.com/..."
              className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Descripción</label>
            <textarea
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-blue-500 min-h-[100px] transition-colors"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Escribe una breve descripción del producto..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)} className="hover:bg-white/5">Cancelar</Button>
            <Button type="submit" className="px-10 h-12 premium-gradient font-bold rounded-xl shadow-lg shadow-blue-500/20">
              {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
