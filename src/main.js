import './app.css'
import './lists/letters'
import './lists/rows'
import App from './App.svelte'
import './store'

const app = new App({
  target: document.getElementById('app'),
})

export default app


