
import React ,{Suspense}from 'react'
const List = React.lazy(() => import('./components/List'));
function App() {

  return (
    <div id='app'>
      <Suspense fallback={<div>Loading...Please Wait</div>}>
      <List/>
      </Suspense>
    </div>
  )
  }

export default App



