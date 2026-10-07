# App Maiêutica: projeto académico

Desenvolvi este protótipo front-end no contexto da unidade curricular de **Marketing e Comunicação Digital**. O projeto inclui um plano de marketing, um site de apresentação e uma peça de e-mail marketing. Estou a preparar esta entrega para o meu portfólio de front-end e UX/UI, melhorando o app aos poucos e mantendo as tecnologias existentes.

## O problema

No meu dia a dia académico, consultava o Moodle e o site da faculdade para encontrar informações sobre aulas, cancelamentos, trabalhos e avisos urgentes. Foi dessa experiência que surgiu a ideia de reunir essas informações num ponto de acesso mais simples e organizado.

No [Plano de Marketing Final](Plano%20Marketing%20Final.pdf), que elaborei com o Ricardo Jesus, apresentamos a proposta de centralizar horários, notas, avaliações e comunicados. O nosso objetivo era facilitar a consulta da informação e melhorar a comunicação na comunidade académica.

## A proposta e o protótipo atual

No plano, propomos uma aplicação com informação académica centralizada, alertas e integração com os sistemas da instituição. Considerámos as necessidades de estudantes, docentes e encarregados de educação.

Neste protótipo, desenvolvi a experiência de estudante no navegador com **HTML, CSS e JavaScript**, usando dados simulados definidos em `app ismai/data.js`.

- Consulta de informação académica, como disciplinas, horários, avaliações e comunicados.
- Navegação entre ecrãs, login de demonstração e opções de interface, incluindo tema claro e escuro.
- Site de apresentação e e-mail marketing para comunicar a proposta.
- Plano de marketing e plano de postagens como documentação de suporte.

O login é uma simulação no navegador. Não existe ligação ao Moodle ou aos sistemas académicos, autenticação institucional real ou serviço de notificações em tempo real. A publicação em lojas de aplicações descrita no plano é uma intenção de distribuição, não uma funcionalidade entregue neste repositório.

## Validação do protótipo

Durante o desenvolvimento, testei o protótipo com alguns estudantes e com a docente. Verificámos tarefas como consultar o horário de aulas, os avisos importantes, o calendário e as notas. Concluímos que o protótipo cumpria os requisitos que tínhamos definido para o projeto.

## Como explorar

Não é necessário instalar dependências nem compilar o projeto.

1. Descarrega o repositório através de **Code → Download ZIP** no GitHub e extrai os ficheiros, ou clona-o:

   ```sh
   git clone https://github.com/AlefAmaral3/app-ismai-marketing.git
   cd app-ismai-marketing
   ```

2. Abre `app ismai/index.html` no navegador para explorar o protótipo.
3. No login, usa os dados de demonstração: número **21903456** e palavra-passe **1234**. Estes valores já estão preenchidos na página original.
4. Abre `app ismai/website-index.html` para ver o site de apresentação.
5. Abre `app ismai/E-mail Marketing/email-marketing-maieutica.html` para ver a peça de e-mail marketing no navegador.

As fontes do Google Fonts e os ícones do Font Awesome são carregados pela internet. Algumas preferências e o estado da demonstração são guardados no armazenamento local do navegador (`localStorage`).

A visualização do e-mail no navegador permite consultar a peça; a compatibilidade com clientes de e-mail ainda precisa de ser avaliada.

## Organização

```text
app-ismai-marketing/
├── README.md
├── LICENSE
├── Plano Marketing Final.pdf
└── app ismai/
    ├── index.html                  # Página principal do protótipo
    ├── index_novo.html             # Página alternativa preservada da entrega
    ├── styles.css
    ├── app.js                     # Interações do protótipo
    ├── data.js                    # Dados simulados
    ├── website-index.html         # Site de apresentação
    ├── website-styles.css
    ├── website-script.js
    ├── privacy-policy.html
    ├── cookies-policy.html
    ├── assets/
    ├── E-mail Marketing/          # HTML e imagens da campanha
    └── Plano_Postagens_App_Maieutica.pdf
```

## Evolução para o portfólio

Mantive a [entrega original](https://github.com/AlefAmaral3/app-ismai-marketing/commit/9376d08d52c5d1c991ccb802af8b9be0569ccfc3) no primeiro commit. Vou registar as próximas melhorias em novos commits, preservando o app e as tecnologias existentes.

Os meus próximos passos são:

- Analisar os percursos atuais e registar oportunidades de melhoria de usabilidade, acessibilidade e adaptação a diferentes ecrãs.
- Aplicar **IBM Plex Sans**, a fonte que escolhi para esta fase e que ainda não apliquei ao app.
- Refinar a interface gradualmente, documentando a razão de cada alteração e a forma de a verificar.
- Construir o estudo de caso com contexto, decisões, comparações e resultados de validação, à medida que esse trabalho for realizado.

Os benefícios que apresentamos no plano são objetivos do projeto. Nos testes informais, não recolhi métricas que permitam quantificar o impacto da proposta.

## Documentação e autoria

- [Plano de Marketing Final](Plano%20Marketing%20Final.pdf)
- [Plano de Postagens](app%20ismai/Plano_Postagens_App_Maieutica.pdf)

Sou o **Alef Amaral** e elaborei o Plano de Marketing com o **Ricardo Jesus**, no âmbito do trabalho académico. Neste portfólio, vou documentar a evolução do protótipo e as decisões que tomar ao longo do processo.

Este repositório apresenta um projeto académico; não constitui um serviço institucional em produção. O ficheiro [LICENSE](LICENSE) contém a licença MIT. Os nomes e elementos de identidade das instituições são utilizados no contexto do projeto académico.
