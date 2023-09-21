import Ajv from 'ajv'
import { definitionHelper } from '../utils/schemaDefinitions'

Cypress.Commands.add('contractTest', (schema, answer) => {
    
    const getSchemaError = ajvErros => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePatch']} é inválido. Erro: ${ajvErros[0]['message']}`
        )
    }

    const ajv = new Ajv()
    const validation = ajv.addSchema(definitionHelper).compile(schema)
    const valid = validation(answer)

    if (!valid) {
        getSchemaError(validation.errors).then(schemaError => {
            throw new Error(schemaError)
        })
    } else
        expect(valid, 'Validação de contrato').to.be.true
})