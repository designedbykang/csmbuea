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
      fontSize: '2rem',
      flexDirection: 'column' 
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        CSM Buea is live!
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        If you see this, the 404 is completely gone.
      </p>
    </div>
  )
}