# App de Apadrinhamento Virtual - Latidos e Miados

Aplicativo mobile focado no apadrinhamento de animais resgatados. O objetivo do projeto é conectar doadores à ONG Latidos e Miados, permitindo que os padrinhos acompanhem o dia a dia dos animais que ajudam através de um feed de atualizações, promovendo um vínculo emocional e garantindo total transparência financeira por parte da instituição.

# Funcionalidades Principais

O aplicativo é dividido em duas experiências principais (fluxos de usuário):

Visão do Padrinho (Usuário Comum)

- Catálogo de Animais: Visualização de animais disponíveis para apadrinhamento com filtros por espécie (Cães e Gatos).

- Fluxo de Apadrinhamento: Escolha do valor mensal e forma de pagamento (Pix, Cartão, Boleto).

- Certificado Digital: Geração e compartilhamento de certificado de apadrinhamento.

- Feed de Atualizações (Meus Afilhados): Mural estilo rede social com fotos e vídeos exclusivos dos animais apadrinhados.

- Transparência: Aba dedicada para visualização de relatórios financeiros da ONG, mostrando exatamente para onde o dinheiro está indo.

- Gestão de Assinatura: Possibilidade de alterar valor, pausar ou cancelar o apadrinhamento diretamente pelo app.

- Agendamento de Visitas: Interface para agendar visitas presenciais à ONG aos sábados.

Visão da ONG (Modo Administrativo)

- Painel da ONG: Dashboard com métricas de arrecadação e alertas de animais sem posts recentes.

- Gestão de Conteúdo: Criação de novos posts (fotos/vídeos) no feed dos padrinhos para atualizar o estado de saúde ou dia a dia do animal.

- Gestão de Animais: Cadastro de novos animais resgatados na plataforma e edição de perfis.

# Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

- React Native: Framework para desenvolvimento mobile cross-platform.

- Expo: Plataforma para desenvolvimento, construção e iteração rápida de aplicações React Native.

- React Navigation: Biblioteca principal de roteamento e navegação (Stack Navigation e Bottom Tabs Navigation).

- JavaScript (ES6+): Linguagem base do projeto.

# Como rodar o projeto localmente

Para clonar e testar o projeto na sua própria máquina, você precisará do Node.js instalado.

1. Clone o repositório:

```
git clone https://github.com/SEU-USUARIO/nome-do-repositorio.git
cd latidos-e-miados
```

2. Instale as dependências:

```
npm install
```

3. Inicie o servidor do Expo:

```
npx expo start
```

4. Testando no celular:
Baixe o aplicativo Expo Go (disponível para Android e iOS) e escaneie o QR Code que aparecerá no seu terminal.
(Alternativamente, você pode apertar a no terminal para abrir no emulador Android ou i para o simulador iOS, desde que estejam configurados na sua máquina).