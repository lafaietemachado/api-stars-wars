/// <reference types="cypress" />

import { contractTestFilms } from '../../fixtures/validApi_Url'
import { invalidRequest } from '../../fixtures/invalidApi_Url'

describe('Validações', () => {

    let fixtureTitles = ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith']

    context('Validar o formato da request (json válido) para a API:', () => {
        it('valida formato da request', () => {

            cy.request({
                method: 'GET',
                url: 'films/?format=json'
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.count).eq(6)

                for (let i = 0; i < fixtureTitles.length; i++) {
                    expect(body.results[i].title).to.eq(fixtureTitles[i])
                }
                cy.contractTest(contractTestFilms, body)
            })
        })
    })
})

context('Validar retornos para URLs inválidas', () => {

    it('Retornos para URLs inválidas', () => {
        cy.request({
            method: 'GET',
            url: 'people/?format=jsonx',
            failOnStatusCode: false
        }).then(({ status, body }) => {
            expect(status).to.eq(404)

            cy.contractTest(invalidRequest, body)
        })
    })
})

context('Validar se o filme 10 é válido e qual o tipo de retorno ao consultar', () => {
    it('Valida se filme 10 é válido', () => {
        cy.request({
            method: 'GET',
            url: 'films/10',
            failOnStatusCode: false
        }).then(({ status, body }) => {
            expect(status).to.eq(404)

            cy.contractTest(requestInvalido, body)
        })
    })

    context('Validar o nome correto de um determinado episódio de filme', () => {
        it('Nome correto de um episódio de filme', () => {

            cy.request({
                method: 'GET',
                url: 'films/',
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.results[3].title).to.eq('The Phantom Menace')
            })
        })
    })

    context('Validar o ID do episódio e se o tipo do dado está correto', () => {
        it('ID do episódio e o tipo do dado está correto', () => {
            cy.request({
                method: 'GET',
                url: 'films/',
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(Number.isInteger(response.body.results[3].episode_id)).to.be.true
                expect(response.body.results[3].title).to.eq('The Phantom Menace')
            })
        })
    })

    context('Validar o formato de data válida e validar se a data não é padrão Brasil', () => {
        it.only('formato de data', () => {
            cy.request({
                method: 'GET',
                url: 'films/',
            }).should((response) => {
                const dataValue = response.body.results[0].release_date
                const regex = /^\d{4}-\d{2}-\d{2}$/
                const trueRegex = regex.test(dataValue)

                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body.results[0]).to.have.property('release_date')
                expect(trueRegex).to.be.true
            })
        })
    })

    context('Validar o peso, altura do “people” C-3POe validar um filme que tenha participado', () => {

        it('Validar Peso e altura C-3P0', () => {
            cy.request({
                method: 'GET',
                url: 'people/2',
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.mass).to.eq('75')
                expect(body.height).to.eq('167')
                expect(body.films[4]).to.contains('films/5')
            })
        })
    })
})