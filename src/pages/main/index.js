import React, { Component } from 'react'
import api from './../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'

export default class Main extends Component {
    
    //variáveis
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }


    // essa função será executado assim que o componente for mostrado em tela
    componentDidMount() {
            
        this.loadProducts()
    }

    // quando for criado uma função por nós, 
    // precisamos usar o modelo de arrow-functions
    loadProducts = async (page = 1) => {
        //acessando api
        const response = await api.get(`/products?page=${page}`)

        // pegando os docs e o resto 
        const { docs, ...productInfo } = response.data


        this.setState({ products: docs, productInfo:productInfo, page:page })
    }



    nextPage = () => {

        const { page, productInfo } = this.state

        // verificar se já estamos na ultima pagina, se sim simplesmente da um return
        if(page === productInfo.pages) return


        // se não tiver na ultima pagina

        // pegar a próxima pagina
        const pageNumber = page + 1 


        // vou setar a pagina no LoadProducts
        this.loadProducts(pageNumber)

    }

    prevPage = () => {
        const { page } = this.state
        

        // veificar se é a primeira, se for não tem pra onde voltar
        if(page === 1) return

        //voltar
        const pageNumber = page - 1
        
        //setar a pagina
        this.loadProducts(pageNumber)
    }


    render() {

        const { products, page, productInfo } = this.state 

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={ product._id }>
                        <strong> { product.title } </strong>
                        <p> { product.description } </p>


                        <Link to={`/products/${ product._id}`}> Acessar </Link>

                    </article>
                ))}
                <div className="actions">
                    
                    <button disabled={ page === 1 } onClick={this.prevPage} >Anterior</button>
                    <button disabled={ page === productInfo.pages }onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}