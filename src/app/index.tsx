import { Routing } from '@/pages'
import { withProviders } from './providers'

import './index.css'

const App = withProviders(() => <Routing />)

export default App
