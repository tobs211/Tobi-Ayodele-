import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Artisanal Sourdough Loaf',
    category: 'Sourdough',
    price: 2500,
    description: 'A crisp, deeply golden crust with a soft, airy crumb and gentle tang.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
    tag: 'Bestseller',
  },
  {
    id: 2,
    name: 'Soft Milk Loaf',
    category: 'Everyday bread',
    price: 1800,
    description: 'Tender, pillowy slices made for breakfast toast and afternoon sandwiches.',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=85',
    tag: 'Customer favourite',
  },
  {
    id: 3,
    name: 'Honey Whole Grain',
    category: 'Whole grain',
    price: 2200,
    description: 'A hearty, nutty loaf with cracked grains and a touch of local honey.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
    tag: 'Whole grain',
  },
  {
    id: 4,
    name: 'Seeded Harvest Loaf',
    category: 'Whole grain',
    price: 2700,
    description: 'Toasted seeds and oats bring a satisfying crunch to every slice.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=85',
    tag: 'Small batch',
  },
  {
    id: 5,
    name: 'Cinnamon Swirl',
    category: 'Sweet bakes',
    price: 2900,
    description: 'Soft, buttery dough rolled with fragrant cinnamon and just enough sugar.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=85',
    tag: 'Weekend treat',
  },
  {
    id: 6,
    name: 'Brioche Buns, 4 pack',
    category: 'Sweet bakes',
    price: 2400,
    description: 'Golden, buttery buns with a soft centre, ready for your best burger.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
    tag: 'Four per pack',
  },
]

const categories = ['All breads', 'Sourdough', 'Everyday bread', 'Whole grain', 'Sweet bakes']
const naira = new Intl.NumberFormat('en-NG')
const formatPrice = (amount) => `₦${naira.format(amount)}`

function App() {
  const [category, setCategory] = useState('All breads')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderReference, setOrderReference] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('just-bread-theme') === 'dark')

  const visibleProducts = category === 'All breads'
    ? products
    : products.filter((product) => product.category === category)
  const itemCount = cart.reduce((total, item)  => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = cart.length ? 1000 : 0

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) {
        return items.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
      }
      return [...items, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(productId, amount) {
    setCart((items) => items
      .map((item) => item.id === productId
        ? { ...item, quantity: item.quantity + amount }
        : item)
      .filter((item) => item.quantity > 0))
  }

  function placeOrder() {
    if (!cart.length) return
    setOrderReference(`#JB-${Math.floor(1000 + Math.random() * 9000)}`)
    setCart([])
    setCartOpen(false)
  }

  function subscribe(event) {
    event.preventDefault()
    setSubscribed(true)
    event.currentTarget.reset()
  }

  function toggleTheme() {
    setDarkMode((current) => {
      const next = !current
      localStorage.setItem('just-bread-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <div className="app-shell" data-theme={darkMode ? 'dark' : 'light'}>
      <div className="announcement">
        <span>Fresh from our ovens</span>
        <span className="announcement-divider" aria-hidden="true">/</span>
        <span>Delivered across Lagos in about 30 minutes</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Just Bread home">
          <span className="brand-mark" aria-hidden="true">JB</span>
          <span className="brand-copy">
            <strong>JUST BREAD</strong>
            <small>By Ayodele Oluwatobiloba</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#menu">The menu</a>
          <a href="#story">Our story</a>
          <a href="#process">How it works</a>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`} title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
            <span className="theme-icon" aria-hidden="true">{darkMode ? '☼' : '☾'}</span>
            <span className="theme-toggle-label">{darkMode ? 'Light' : 'Dark'}</span>
          </button>
          <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`Open basket, ${itemCount} items`}>
            <span className="basket-icon" aria-hidden="true">▱</span>
            <span className="cart-trigger-label">Basket</span>
            <span className="cart-count">{itemCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Lagos, baked with care</p>
            <h1>Good bread makes <em>every day</em> better.</h1>
            <p className="hero-description">Slow-fermented loaves, soft everyday favourites, and warm bakes delivered fresh to your door.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#menu">Explore the menu <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#story">Meet the baker <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-note"><span className="fresh-dot" /> Baked fresh daily, from 5:00 AM</div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=90" alt="Freshly baked artisan loaves on a bakery counter" />
            <div className="hero-stamp"><span>Made fresh</span><strong>with<br />purpose</strong><span>in Lagos, NG</span></div>
            <div className="hero-caption"><span>01 / 06</span><span>From our oven to your table</span></div>
          </div>
        </section>

        <section className="promise-strip" aria-label="Our promise">
          <div><strong>01</strong><span>Thoughtful ingredients</span></div>
          <div><strong>02</strong><span>Fair, everyday prices</span></div>
          <div><strong>03</strong><span>Quick local delivery</span></div>
          <div className="promise-rating"><span aria-hidden="true">★★★★★</span><span>4.9 from our community</span></div>
        </section>

        <section className="menu-section section-wrap" id="menu">
          <div className="section-heading menu-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> Made in small batches</p>
              <h2>Today’s good things</h2>
            </div>
            <p>Simple ingredients, patient hands, and a little something for every kind of morning.</p>
          </div>

          <div className="category-tabs" role="group" aria-label="Filter breads by category">
            {categories.map((item) => (
              <button
                className={category === item ? 'category-tab is-active' : 'category-tab'}
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="product-number">0{index + 1}</span>
                </div>
                <div className="product-info">
                  <div className="product-meta"><span>{product.category}</span><span>{product.tag}</span></div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-buy-row">
                    <strong>{formatPrice(product.price)}</strong>
                    <button className="add-button" type="button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to basket`}>
                      <span aria-hidden="true">+</span> Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="process-image">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1100&q=85" alt="Baker preparing fresh bread in the kitchen" loading="lazy" />
            <span className="image-label">A little patience goes a long way.</span>
          </div>
          <div className="process-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Freshness, without the fuss</p>
            <h2>From our hands<br />to your home.</h2>
            <p className="process-intro">Good bread should fit into real life. We keep the process thoughtful and the delivery easy.</p>
            <ol className="process-steps">
              <li><span>01</span><div><strong>Pick your favourites</strong><p>Choose from the day’s small-batch bakes.</p></div></li>
              <li><span>02</span><div><strong>We bake to order</strong><p>Our bakers prepare each loaf with care.</p></div></li>
              <li><span>03</span><div><strong>Meet your delivery</strong><p>Fresh bread finds its way to your doorstep.</p></div></li>
            </ol>
            <a className="text-link text-link-light" href="#menu">Find your loaf <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="story-section section-wrap" id="story">
          <div className="story-kicker"><span>Our story</span><span>Est. with heart</span></div>
          <div className="story-content">
            <h2>“Everyone deserves a loaf they look forward to bringing home.”</h2>
            <div className="story-details">
              <p>JUST BREAD began with a simple belief: exceptional bread should feel like part of everyday life, not a special occasion. We bring the craft of careful baking together with the ease of ordering online.</p>
              <p className="founder-signature">Ayodele Oluwatobiloba <span>Founder &amp; Head Baker</span></p>
            </div>
          </div>
        </section>

        <section className="closing-banner">
          <div><p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Your next favourite loaf</p><h2>Make room for<br /><em>something good.</em></h2></div>
          <a className="button button-light" href="#menu">Shop today’s bakes <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="brand brand-footer" href="#top">
              <span className="brand-mark" aria-hidden="true">JB</span>
              <span className="brand-copy"><strong>JUST BREAD</strong><small>By Ayodele Oluwatobiloba</small></span>
            </a>
            <p>Excellent bread. Everyday prices.<br />A little joy, delivered fresh.</p>
          </div>
          <div className="footer-links"><strong>Explore</strong><a href="#menu">The menu</a><a href="#story">Our story</a><a href="#process">How it works</a></div>
          <div className="footer-links"><strong>Find us</strong><span>Lagos, Nigeria</span><a href="mailto:hello@justbread.ng">hello@justbread.ng</a><a href="tel:+2348005872327">+234 800 JUST BREAD</a></div>
          <form className="newsletter" onSubmit={subscribe}>
            <label htmlFor="newsletter-email">A good thing in your inbox.</label>
            <p>New bakes, little notes, and the occasional treat.</p>
            <div className="newsletter-input"><input id="newsletter-email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe">→</button></div>
            {subscribed && <span className="subscribe-confirmation" role="status">You’re on the list. Thank you!</span>}
          </form>
        </div>
        <div className="footer-bottom"><span>© 2026 JUST BREAD. Baked in Lagos.</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {cartOpen && (
        <div className="cart-layer">
          <button className="cart-backdrop" type="button" aria-label="Close basket" onClick={() => setCartOpen(false)} />
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-header"><div><p className="eyebrow"><span className="eyebrow-line" /> Just for you</p><h2 id="cart-title">Your basket <span>({itemCount})</span></h2></div><button className="close-button" type="button" onClick={() => setCartOpen(false)} aria-label="Close basket">×</button></div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart"><span aria-hidden="true">◌</span><h3>Your basket is taking a little rest.</h3><p>Find something fresh from today’s menu.</p><button className="button button-dark" type="button" onClick={() => setCartOpen(false)}>Browse the menu</button></div>
              ) : cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-detail"><strong>{item.name}</strong><span>{formatPrice(item.price)}</span><div className="quantity-control"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button></div></div>
                  <strong className="cart-line-total">{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            {cart.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Local delivery</span><strong>{formatPrice(deliveryFee)}</strong></div><div className="cart-total"><span>Total</span><strong>{formatPrice(subtotal + deliveryFee)}</strong></div><button className="button button-dark checkout-button" type="button" onClick={placeOrder}>Place your order <span aria-hidden="true">→</span></button><p className="checkout-note">Delivery details can be confirmed at checkout.</p></div>}
          </aside>
        </div>
      )}

      {orderReference && (
        <div className="order-layer" role="presentation">
          <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
            <span className="order-check" aria-hidden="true">✓</span><p className="eyebrow"><span className="eyebrow-line" /> Order received</p><h2 id="order-title">That’s a good choice.</h2><p>Your order is in the oven queue. We’ll be in touch to confirm delivery details.</p><span className="order-reference">Order reference <strong>{orderReference}</strong></span><button className="button button-dark" type="button" onClick={() => setOrderReference('')}>Back to the bakery</button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
