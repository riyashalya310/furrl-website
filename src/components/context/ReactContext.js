import React from 'react'

const ReactContext=React.createContext({
    productsList: [],
    onChangeProductsList: () => {}
})

export default ReactContext