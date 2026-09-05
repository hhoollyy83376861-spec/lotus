import { CartProvider } from '@/components/cart-provider'
import { ProductsProvider } from '@/components/products-provider'
import { CartDrawer } from '@/components/cart-drawer'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TrustBar } from '@/components/trust-bar'
import { ProductCatalog } from '@/components/product-catalog'
import { Testimonials } from '@/components/testimonials'
import { InstagramGallery } from '@/components/instagram-gallery'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <ProductsProvider>
      <CartProvider>
        <SiteHeader />
        <main>
          <Hero />
          <TrustBar />
          <ProductCatalog />
          <Testimonials />
          <InstagramGallery />
        </main>
        <SiteFooter />
        <CartDrawer />
      </CartProvider>
    </ProductsProvider>
  )
}
