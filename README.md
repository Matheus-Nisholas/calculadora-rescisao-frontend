# Calculadora de Rescisão - Frontend

![Interface da Aplicação](https://i.imgur.com/c986bc.png) Interface web moderna e responsiva para a Calculadora de Rescisão, construída com a versão mais recente do Angular e utilizando componentes standalone. A aplicação consome a API do backend para fornecer uma experiência de usuário completa, desde o registro até a visualização detalhada dos cálculos.

---

## ✨ Funcionalidades Principais

* **Arquitetura Standalone:** Projeto construído com a arquitetura de componentes standalone do Angular, sem a necessidade de `NgModules`.
* **Interface Reativa:** Formulários e listas que reagem em tempo real às ações do usuário.
* **Design Profissional:** Interface elegante e consistente, construída com a biblioteca de componentes **Angular Material**.
* **Fluxo de Autenticação Completo:** Telas de login e registro com validação de dados e feedback para o usuário.
* **Rotas Protegidas:** Apenas usuários autenticados podem acessar as áreas de cálculo e histórico.
* **Histórico Paginado:** Tabela de histórico com paginação, ordenação de colunas e funcionalidade de exclusão com diálogo de confirmação.
* **Download de PDF:** Integração com a API para permitir o download dos recibos de cálculo.

---

## 🚀 Tecnologias Utilizadas

* **Angular 18+** (ou a versão que você estiver usando)
* **TypeScript**
* **Angular Material:** Para componentes de UI.
* **RxJS:** Para programação reativa e gerenciamento de dados assíncronos.
* **HTML5 & CSS3:** Com foco em layouts responsivos (Grid/Flexbox).

---

## 🏁 Como Executar (Ambiente de Desenvolvimento)

### Pré-requisitos

* Node.js e npm instalados.
* Angular CLI instalado globalmente (`npm install -g @angular/cli`).
* O **servidor do backend** deve estar em execução.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/calculadora-rescisao-frontend.git](https://github.com/seu-usuario/calculadora-rescisao-frontend.git)
    cd calculadora-rescisao-frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute a Aplicação:**
    ```bash
    ng serve -o
    ```
    O comando irá compilar o projeto e abri-lo automaticamente no seu navegador no endereço [http://localhost:4200/](http://localhost:4200/).

---
