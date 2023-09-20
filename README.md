Projeto de automação da API Star Wars
Objetivo: automatizar cenários de teste visando tempo, qualidade do projeto e avaliação do candidato
Squad: Teste de Automação
Coordenador: 
P.O.: 
Tech leads: 
QA: Lafaiete Rodrigues Machado

Instalação e execução
Requisitos:
Node: a partir da versão 12 (Projeto realizado na versão 14.15.1)

Hardware: 4GB Ram min, 8GB RAM recomendado

Execução e boas práticas:

Criar uma pasta com nome "Api-Star-Wars" na raiz da máquina (C:\Api-Star-Wars)

Realizar o git clone para essa pasta e instalar dependências do node

Ex:

Com o terminal aberto:

cd C:\Api-Star-Wars git clone 'link do projeto' npm install

Caso as dependências do node não sejam instaladas, deve-se instalar de forma separada: npm install -D cypress@13.2.0

Instalado e configurado a biblioteca de relatórios Mochawesome

Instalado a biblioteca ajv versão 8.12.0

Execução: abrir interface do cypress: npx run cy:open

executar em modo headless: npx run cy:run

executar em modo headless gerando relatório do mochawesome: npx cypress run --reporter mochawesome