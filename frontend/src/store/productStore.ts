import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios';

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
}

interface ProductState {
  productos: Producto[];
  isLoading: boolean;
  error: string | null;
  fetchProductos: () => Promise<void>;
  createProducto: (producto: Partial<Producto>) => Promise<void>;
  updateProducto: (id: string, producto: Partial<Producto>) => Promise<void>;
  deleteProducto: (id: string) => Promise<void>;
}

// Lista extendida con los productos solicitados y más variedad
const INITIAL_PRODUCTS: Producto[] = [
  { 
    id: '1', 
    nombre: 'Laptop Pro X1', 
    descripcion: 'Potente laptop para diseño y desarrollo con procesador de última generación.', 
    precio: 1200, 
    stock: 15,
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '2', 
    nombre: 'Monitor 4K Ultra', 
    descripcion: 'Monitor de 27 pulgadas con resolución 4K y precisión de color profesional.', 
    precio: 450, 
    stock: 8,
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '3', 
    nombre: 'Teclado Mecánico RGB', 
    descripcion: 'Teclado retroiluminado con switches táctiles y respuesta ultrarrápida.', 
    precio: 85, 
    stock: 25,
    imagen: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '4', 
    nombre: 'Mouse Gamer Wireless', 
    descripcion: 'Mouse ergonómico inalámbrico con sensor de 20,000 DPI.', 
    precio: 60, 
    stock: 40,
    imagen: 'https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '5', 
    nombre: 'Silla Ergonómica Pro', 
    descripcion: 'Silla con soporte lumbar ajustable y materiales transpirables para largas jornadas.', 
    precio: 299, 
    stock: 12,
    imagen: 'https://images.unsplash.com/photo-1505797149-43b00fe2777b?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '6', 
    nombre: 'Cámara Web 1080p', 
    descripcion: 'Cámara con micrófono integrado y corrección de luz automática.', 
    precio: 75, 
    stock: 30,
    imagen: 'https://images.unsplash.com/photo-1615810233140-19266f830491?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '7', 
    nombre: 'Auriculares Noise Cancelling', 
    descripcion: 'Auriculares premium con cancelación de ruido activa y sonido de alta fidelidad.', 
    precio: 199, 
    stock: 18,
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '8', 
    nombre: 'Disco SSD 1TB NVMe', 
    descripcion: 'Almacenamiento ultra rápido para mejorar el rendimiento de cualquier PC.', 
    precio: 110, 
    stock: 50,
    imagen: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=800'
  },
];

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productos: INITIAL_PRODUCTS,
      isLoading: false,
      error: null,

      fetchProductos: async () => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.get('/productos/dashboard');
          // Map backend ProductoDetalleDto to frontend Producto
          const mapped = data.productos.map((p: any) => ({
            id: p.id.toString(),
            nombre: p.nombre,
            descripcion: p.categoria?.nombre || 'Sin categoría',
            precio: p.precio,
            stock: p.inventario?.stock || 0,
            imagen: p.imagen || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
          }));
          set({ productos: mapped, isLoading: false });
        } catch (error: any) {
          set({ error: 'Error al cargar productos', isLoading: false });
        }
      },

      createProducto: async (producto) => {
        set({ isLoading: true, error: null });
        try {
          const payload = {
            nombre: producto.nombre,
            precio: producto.precio,
            categoriaId: 1, // Default category for now
            imagen: producto.imagen,
            stock: producto.stock
          };
          await api.post('/productos', payload);
          // Refresh list to get updated data with relations
          const { data } = await api.get('/productos/dashboard');
          const mapped = data.productos.map((p: any) => ({
            id: p.id.toString(),
            nombre: p.nombre,
            descripcion: p.categoria?.nombre || 'Sin categoría',
            precio: p.precio,
            stock: p.inventario?.stock || 0,
            imagen: p.imagen || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
          }));
          set({ productos: mapped, isLoading: false });
        } catch (error: any) {
          set({ error: 'Error al crear producto', isLoading: false });
          throw error;
        }
      },

      updateProducto: async (id, producto) => {
        set({ isLoading: true, error: null });
        try {
          await api.patch(`/productos/${id}`, {
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            stock: producto.stock
          });
          // Refresh list
          const { data } = await api.get('/productos/dashboard');
          const mapped = data.productos.map((p: any) => ({
            id: p.id.toString(),
            nombre: p.nombre,
            descripcion: p.categoria?.nombre || 'Sin categoría',
            precio: p.precio,
            stock: p.inventario?.stock || 0,
            imagen: p.imagen || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
          }));
          set({ productos: mapped, isLoading: false });
        } catch (error: any) {
          set({ error: 'Error al actualizar producto', isLoading: false });
          throw error;
        }
      },

      deleteProducto: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await api.delete(`/productos/${id}`);
          set((state) => ({
            productos: state.productos.filter((p) => p.id !== id),
            isLoading: false,
          }));
        } catch (error: any) {
          set({ error: 'Error al eliminar producto', isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'product-storage',
    }
  )
);
