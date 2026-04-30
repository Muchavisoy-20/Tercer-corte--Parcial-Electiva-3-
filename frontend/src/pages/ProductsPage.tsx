import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { Plus, Pencil, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductsPage = () => {
  const { productos, isLoading, fetchProductos, createProducto, updateProducto, deleteProducto } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' });

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ 
        nombre: product.nombre, 
        descripcion: product.descripcion, 
        precio: product.precio, 
        stock: product.stock,
        imagen: product.imagen || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({ nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProducto(editingProduct.id, formData);
        toast.success('Producto actualizado exitosamente');
      } else {
        await createProducto(formData);
        toast.success('Nuevo producto añadido al inventario');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Ocurrió un error al procesar la solicitud');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      try {
        await deleteProducto(id);
        toast.success('Producto eliminado del sistema');
      } catch (error) {
        toast.error('Error al intentar eliminar el producto');
      }
    }
  };

  const filteredProducts = productos.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between bg-slate-900/40 p-8 rounded-3xl border border-white/10 glass shadow-xl">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase">Inventario Real</h2>
          <p className="text-slate-400 font-medium">Control total de stock y visualización de productos.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="h-14 px-8 text-lg font-bold premium-gradient rounded-2xl shadow-blue-500/20 shadow-2xl hover:scale-105 active:scale-95 transition-all gap-3">
          <Plus className="h-6 w-6" /> Nuevo Producto
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5 glass">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 z-10" />
          <Input
            placeholder="Buscar por nombre..."
            className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid Section */}
      {isLoading && productos.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <Spinner className="h-12 w-12" />
          <p className="text-slate-400 animate-pulse font-medium">Cargando catálogo...</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
              >
                <Card className="overflow-hidden group glass border-white/10 bg-slate-900/40 hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-blue-500/10">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="h-56 relative overflow-hidden">
                       <img 
                        src={product.imagen} 
                        alt={product.nombre} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                       
                       <div className="absolute top-4 right-4 flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <Button variant="secondary" size="icon" className="rounded-xl glass border-white/20 hover:bg-blue-500 hover:text-white backdrop-blur-sm" onClick={() => handleOpenModal(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="rounded-xl glass border-white/20 hover:bg-red-500 hover:text-white backdrop-blur-sm" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                       </div>
                       
                       <div className="absolute bottom-4 left-4">
                          <Badge variant={product.stock > 0 ? 'success' : 'destructive'} className="uppercase tracking-widest px-3 py-1 text-[10px] font-black rounded-lg shadow-lg">
                            {product.stock > 0 ? `${product.stock} EN STOCK` : 'AGOTADO'}
                          </Badge>
                       </div>
                    </div>
                    
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="space-y-1">
                        <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{product.nombre}</h3>
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{product.descripcion}</p>
                      </div>
                      
                      <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Precio de Venta</span>
                           <span className="text-2xl font-black text-white">${product.precio}</span>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <ImageIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Modal Section */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'MODIFICAR PRODUCTO' : 'REGISTRAR NUEVO PRODUCTO'}
        className="max-w-2xl bg-[#020617] border-white/20"
      >
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-200 ml-1">Nombre</label>
              <Input
                placeholder="Nombre del producto"
                className="bg-white/5 border-white/10 text-white h-12"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-200 ml-1">Precio</label>
              <Input
                type="number"
                placeholder="0.00"
                className="bg-white/5 border-white/10 text-white h-12"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-200 ml-1">URL de la Imagen</label>
            <Input
              placeholder="https://ejemplo.com/imagen.jpg"
              className="bg-white/5 border-white/10 text-white h-12"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-200 ml-1">Descripción</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2 max-w-[200px]">
            <label className="text-sm font-bold text-slate-200 ml-1">Stock</label>
            <Input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              className="bg-white/5 border-white/10 text-white h-12"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit" className="px-8 premium-gradient">Guardar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
