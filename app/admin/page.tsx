import { ProductsProvider } from '@/components/products-provider'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export const metadata = {
  title: 'ניהול מוצרים · לוֹטוּס',
}

export default function AdminPage() {
  return (
    <ProductsProvider>
      <AdminDashboard />
    </ProductsProvider>
  )
}
