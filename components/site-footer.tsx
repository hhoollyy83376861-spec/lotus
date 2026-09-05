export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-semibold text-foreground">
              לוֹטוּס
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              מטפחות סאטן · 1×1 מ׳ · לא מחליקות
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              ניווט
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="#collection" className="transition-colors hover:text-foreground">
                  הקולקציה
                </a>
              </li>
              <li>
                <a href="#testimonials" className="transition-colors hover:text-foreground">
                  המלצות
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors hover:text-foreground">
                  גלריה
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              שירות לקוחות
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>משלוחים והחזרות</li>
              <li>צרו קשר · 03-000-0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} לוֹטוּס. כל הזכויות שמורות.</p>
          <p>עוצב באהבה · תוצרת ישראל</p>
        </div>
      </div>
    </footer>
  )
}
