
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './utils/constants'

const clientId=GOOGLE_CLIENT_ID

function App() {

  return (
<>
<GoogleOAuthProvider clientId={clientId}>
<BrowserRouter>
<AppRoutes/>
</BrowserRouter>
</GoogleOAuthProvider>
</>
  )
}

export default App
