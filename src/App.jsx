import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, Check, Heart, Menu, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react'

const products = [
  { id: 1, name: 'Solara Hoops', category: 'Earrings', price: 2490, tag: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85', tone: 'Gold vermeil', description: 'Sculptural everyday hoops with a soft, sunlit finish.' },
  { id: 2, name: 'The Heirloom Chain', category: 'Necklaces', price: 3290, tag: 'NEW', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85', tone: '18k gold plated', description: 'A delicate chain designed to layer beautifully or shine alone.' },
  { id: 3, name: 'Luna Signet Ring', category: 'Rings', price: 1890, tag: '', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85', tone: 'Polished gold', description: 'A modern keepsake with a clean, rounded silhouette.' },
  { id: 4, name: 'Pearl Muse Drops', category: 'Earrings', price: 2790, tag: 'LIMITED', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85', tone: 'Freshwater pearl', description: 'Luminous pearls meet contemporary lines for occasion dressing.' },
  { id: 5, name: 'Amara Cuff', category: 'Bracelets', price: 2990, tag: '', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85', tone: 'Gold vermeil', description: 'An effortless open cuff that adds warmth to every look.' },
  { id: 6, name: 'Dewdrop Pendant', category: 'Necklaces', price: 3590, tag: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85', tone: 'Gold plated', description: 'A tiny drop of light, made for the pieces you never take off.' },
]

const money = n => `₹${n.toLocaleString('en-IN')}`

export default function App() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [notice, setNotice] = useState('')

  const visibleProducts = useMemo(() => category === 'All' ? products : products.filter(p => p.category === category), [category])
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addToCart(product) {
    setCart(current => current.some(item => item.id === product.id)
      ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      : [...current, { ...product, qty: 1 }])
    setNotice(`${product.name} added to your bag`)
    setCartOpen(true)
    setSelected(null)
    setTimeout(() => setNotice(''), 2600)
  }
  function updateQty(id, delta) {
    setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0))
  }
  function toggleWish(id) {
    setWishlist(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])
  }
  function checkout() {
    const lines = cart.map(item => `${item.name} x ${item.qty} — ${money(item.price * item.qty)}`).join('\n')
    const message = `Hello Aurielle! I'd like to enquire about these items:\n${lines}\nTotal: ${money(total)}`
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#28251f]">
      <div className="announcement">A LITTLE SOMETHING EXTRA — FREE SHIPPING ON ORDERS OVER ₹2,999</div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
        <nav className={`nav-left ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop all</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
          <a href="#edit" onClick={() => setMenuOpen(false)}>The edit</a>
        </nav>
        <a href="#" className="brand" aria-label="Aurielle home"><span className="brand-mark">A.</span><span>AURIELLE</span><small>JEWELLERY, WITH MEANING</small></a>
        <div className="nav-right">
          <a className="wishlist-link" href="#shop"><Heart size={17} strokeWidth={1.6}/><span>{wishlist.length || ''}</span></a>
          <button className="bag-button" onClick={() => setCartOpen(true)}><ShoppingBag size={18} strokeWidth={1.6}/><span>Bag</span><span className="bag-count">{cartCount}</span></button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14}/> THE EVERYDAY HEIRLOOMS</p>
            <h1>Little things.<br/><em>Lasting feelings.</em></h1>
            <p className="hero-description">Jewellery that feels like you. Thoughtfully designed pieces for the everyday moments that become your favourite memories.</p>
            <a className="dark-button" href="#shop">Explore the collection <ArrowRight size={16}/></a>
            <div className="hero-footnote"><span className="line"></span><span>MADE TO BE KEPT CLOSE</span></div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=90" alt="Gold jewellery styled in warm sunlight"/>
            <div className="hero-sticker"><span>THE</span><strong>Golden</strong><strong>Hour</strong><span>COLLECTION · 01</span></div>
            <div className="image-caption">01 / A STUDY IN SOFT GOLD</div>
          </div>
          <a href="#shop" className="scroll-cue"><ArrowDownRight size={18}/> SCROLL TO DISCOVER</a>
        </section>

        <section className="promise-strip">
          <div><span>01</span><p>Made for everyday</p></div><div><span>02</span><p>Thoughtful details</p></div><div><span>03</span><p>Gifting, made easy</p></div><div><span>04</span><p>Pieces to keep forever</p></div>
        </section>

        <section id="shop" className="shop-section section-wrap">
          <div className="section-heading">
            <div><p className="eyebrow">YOUR NEXT FAVOURITE</p><h2>Pieces to <em>treasure.</em></h2></div>
            <a href="#edit" className="text-link">Find your everyday <ArrowRight size={15}/></a>
          </div>
          <div className="filter-row">
            <div className="filters">{['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets'].map(c => <button key={c} className={category === c ? 'filter active' : 'filter'} onClick={() => setCategory(c)}>{c}</button>)}</div>
            <span className="product-count">{visibleProducts.length} PIECES</span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, i) => <article className="product-card" key={product.id}>
              <div className="product-image-wrap" onClick={() => setSelected(product)}>
                <img src={product.image} alt={product.name} loading="lazy"/>
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <button className={`wish-button ${wishlist.includes(product.id) ? 'wished' : ''}`} aria-label="Add to wishlist" onClick={e => {e.stopPropagation(); toggleWish(product.id)}}><Heart size={17} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}/></button>
                <button className="quick-add" onClick={e => {e.stopPropagation(); addToCart(product)}}>Add to bag <Plus size={15}/></button>
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.tone}</p></div><strong>{money(product.price)}</strong></div>
            </article>)}
          </div>
          <div className="center-link"><a className="outline-button" href="#shop" onClick={() => setCategory('All')}>View all jewellery <ArrowRight size={16}/></a></div>
        </section>

        <section id="story" className="story-section">
          <div className="story-image"><img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85" alt="Close-up of carefully crafted gold jewellery" loading="lazy"/><span className="vertical-note">AURIELLE — EST. WITH INTENTION</span></div>
          <div className="story-copy"><p className="eyebrow">A NOTE FROM US</p><h2>Not just worn.<br/><em>Woven into your story.</em></h2><p>We believe the most meaningful things are the ones you reach for without thinking. The necklace you wear on big days. The ring that reminds you of someone. The little golden detail that makes an ordinary morning feel special.</p><p>Aurielle is a celebration of those pieces — considered, versatile, and made to become part of you.</p><a className="text-link" href="#newsletter">Get to know Aurielle <ArrowRight size={15}/></a><div className="signature">With love, <span>Aurielle</span></div></div>
        </section>

        <section id="edit" className="edit-section section-wrap">
          <div className="edit-intro"><p className="eyebrow">THE AURIELLE EDIT</p><h2>Your kind of<br/><em>golden.</em></h2><p>Three ways to make the little things feel like a lot.</p><a href="#shop" className="text-link">Shop the edit <ArrowRight size={15}/></a></div>
          <a className="edit-tile tile-one" href="#shop" onClick={() => setCategory('Necklaces')}><img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85" alt="Layered gold necklaces" loading="lazy"/><div><span>01 / THE LAYERING GAME</span><strong>Necklaces</strong><ArrowRight size={17}/></div></a>
          <a className="edit-tile tile-two" href="#shop" onClick={() => setCategory('Earrings')}><img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85" alt="Gold hoop earrings" loading="lazy"/><div><span>02 / LITTLE STATEMENTS</span><strong>Earrings</strong><ArrowRight size={17}/></div></a>
        </section>

        <section className="quote-section"><span className="quote-mark">“</span><blockquote>The best jewellery doesn't change who you are.<br/>It reminds you.</blockquote><span className="quote-credit">A LITTLE AURIELLE THOUGHT</span></section>

        <section id="newsletter" className="newsletter">
          <div><p className="eyebrow">LETTERS, NOT NOISE</p><h2>A little note<br/><em>from us to you.</em></h2><p>First looks, thoughtful gifting ideas, and a little something for your inbox.</p></div>
          <form onSubmit={e => {e.preventDefault(); if(email.trim()) setSubscribed(true)}} className="newsletter-form">
            {subscribed ? <div className="success-message"><Check size={19}/> You're on the list. Talk soon!</div> : <><label htmlFor="email">YOUR EMAIL ADDRESS</label><div className="email-row"><input id="email" type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}/><button aria-label="Subscribe"><ArrowRight size={19}/></button></div><small>By subscribing, you agree to receive occasional notes from Aurielle.</small></>}
          </form>
        </section>
      </main>

      <footer className="footer"><div className="footer-top"><a href="#" className="footer-brand">AURIELLE<span>JEWELLERY, WITH MEANING</span></a><p>For the moments that become memories.</p><a className="back-top" href="#">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© 2026 AURIELLE JEWELLERY</span><div><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#newsletter">Contact</a></div><span>CRAFTED WITH CARE · BUILT BY AMOS</span></div></footer>

      {notice && <div className="toast"><Check size={16}/>{notice}</div>}
      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">YOUR LITTLE TREASURES</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><X/></button></div>{cart.length === 0 ? <div className="empty-bag"><ShoppingBag size={35}/><h3>Your bag is waiting.</h3><p>Something lovely belongs here.</p><button className="dark-button" onClick={() => setCartOpen(false)}>Explore jewellery <ArrowRight size={16}/></button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><p>{money(item.price)}</p><div className="qty-control"><button onClick={() => updateQty(item.id, -1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)}><Plus size={13}/></button></div></div><strong>{money(item.price * item.qty)}</strong></div>)}</div><div className="cart-footer"><div className="subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="dark-button checkout-button" onClick={checkout}>Enquire on WhatsApp <ArrowRight size={16}/></button><small>Demo checkout · WhatsApp number needs updating</small></div></>}</aside></div>}
      {selected && <div className="overlay modal-overlay" onClick={() => setSelected(null)}><div className="product-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-button" onClick={() => setSelected(null)}><X/></button><img src={selected.image} alt={selected.name}/><div className="modal-copy"><p className="eyebrow">{selected.category.toUpperCase()} · AURIELLE</p><h2>{selected.name}</h2><strong>{money(selected.price)}</strong><p>{selected.description}</p><p className="material-note"><Sparkles size={15}/>{selected.tone}</p><button className="dark-button" onClick={() => addToCart(selected)}>Add to bag <Plus size={16}/></button></div></div></div>}
    </div>
  )
}