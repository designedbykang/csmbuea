export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#fff', 
      color: '#000',
      fontFamily: 'sans-serif',
      flexDirection: 'column' 
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        CSM Buea is live!
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        Click below to test the product upload flow.
      </p>
      <a 
        href="/admin/products" 
        style={{
          backgroundColor: '#22c55e',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '9999px',
          fontWeight: '600',
          textDecoration: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        🛠️ Go to Admin Panel
      </a>
    </div>
  )
}