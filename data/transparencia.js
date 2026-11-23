// Dados contábeis, documentos fiscais, eventos e informações institucionais da ONG

export const DADOS_INSTITUCIONAIS = {
  razaoSocial: 'Associação Protetora dos Animais Latidos & Miados',
  cnpj: '04.912.834/0001-55',
  chavePix: 'contato@latidosemiados.org',
  banco: 'Banco do Brasil (001) • Ag: 1234-5 • C/C: 98765-4',
  endereco: 'Rua das Acácias, 120 – Centro',
  auditoria: 'Prestação de contas semestral auditada e submetida ao Conselho Municipal de Proteção e Defesa Animal.',
};

export const TRANSPARENCIA_POR_PERIODO = {
  'Outubro / 2026': {
    resumo: [
      { titulo: 'Arrecadado', valor: 'R$ 4.350' },
      { titulo: 'Gasto', valor: 'R$ 4.250' },
      { titulo: 'Saldo do mês', valor: '+ R$ 100' },
    ],
    gastos: [
      { titulo: 'Ração', valor: 'R$ 1.640', altura: 100 },
      { titulo: 'Remédios', valor: 'R$ 1.120', altura: 70 },
      { titulo: 'Veterinário', valor: 'R$ 860', altura: 50 },
      { titulo: 'Limpeza', valor: 'R$ 420', altura: 30 },
    ],
    documentos: [
      {
        id: 'nf-out-01',
        tipo: 'nota',
        titulo: 'Nota fiscal - Ração e nutrição animal',
        data: '14/10/2026',
        fornecedor: 'Agropecuária & Nutrição Pet Ltda.',
        cnpj: '12.345.678/0001-90',
        valor: 'R$ 1.640,00',
        itens: [
          '80kg Ração Cães Adultos Premium Especial',
          '40kg Ração Gatos Castrados Salmão',
          '24 sachês de nutrição clínica pós-resgate',
        ],
        comprovante: 'DANFE NF-e nº 004.891 • Chave: 3526 1012 3456 7800 0190',
      },
      {
        id: 'nf-out-02',
        tipo: 'nota',
        titulo: 'Recibo clínico - Consultas e vacinação',
        data: '22/10/2026',
        fornecedor: 'Hospital Veterinário Popular São Francisco',
        cnpj: '98.765.432/0001-11',
        valor: 'R$ 860,00',
        itens: [
          'Consulta ortopédica e raio-x (Bolinha)',
          'Vacinação polivalente V10 (3 cães recém-resgatados)',
          'Curativo, medicação e retorno clínico (Tieta)',
        ],
        comprovante: 'Recibo de Prestação de Serviços Clínicos nº 001.092',
      },
    ],
    relatorios: [
      {
        id: 'rel-2025',
        tipo: 'relatorio',
        titulo: 'Relatório Anual Consolidado 2025',
        data: '15/01/2026',
        emissor: 'Conselho Fiscal e Diretoria Executiva',
        cnpj: '04.912.834/0001-55',
        valor: 'R$ 48.720,00',
        resumo: 'Demonstrativo completo de receitas e despesas auditado em assembleia ordinária. 94 animais atendidos no ano.',
        itens: [
          'Alimentação e suprimentos: R$ 19.400,00',
          'Atendimento veterinário e exames: R$ 16.200,00',
          'Medicamentos, vacinas e castrações: R$ 8.920,00',
          'Manutenção das baias e saneamento: R$ 4.200,00',
        ],
        comprovante: 'Ata de Prestação de Contas nº 18/2025 registrada em cartório',
      },
    ],
    eventos: [
      {
        id: 'ev-01',
        titulo: 'Bazar Beneficente de Primavera',
        data: 'Sábado, 08/11/2026 • das 9h às 16h',
        local: 'Sede da ONG • Rua das Acácias, 120',
        arrecadacaoBruta: 'R$ 2.450,00',
        custos: 'R$ 350,00',
        saldoLiquido: 'R$ 2.100,00',
        destinacao: 'O saldo líquido foi 100% revertido para a compra de vacinas anuais e reformas das casinhas para o verão.',
        itens: [
          'Venda de roupas e artigos seminovos doados: R$ 1.600,00',
          'Bolo, tortas e café beneficente: R$ 850,00',
          'Custos de aluguel de tendas e caixas térmicas: - R$ 350,00',
        ],
      },
    ],
  },

  'Setembro / 2026': {
    resumo: [
      { titulo: 'Arrecadado', valor: 'R$ 4.100' },
      { titulo: 'Gasto', valor: 'R$ 3.980' },
      { titulo: 'Saldo do mês', valor: '+ R$ 120' },
    ],
    gastos: [
      { titulo: 'Ração', valor: 'R$ 1.580', altura: 95 },
      { titulo: 'Remédios', valor: 'R$ 980', altura: 60 },
      { titulo: 'Veterinário', valor: 'R$ 920', altura: 55 },
      { titulo: 'Limpeza', valor: 'R$ 500', altura: 35 },
    ],
    documentos: [
      {
        id: 'nf-set-01',
        tipo: 'nota',
        titulo: 'Nota fiscal - Suprimentos de setembro',
        data: '12/09/2026',
        fornecedor: 'Agropecuária & Nutrição Pet Ltda.',
        cnpj: '12.345.678/0001-90',
        valor: 'R$ 1.580,00',
        itens: [
          '75kg Ração Cães Adultos Premium Especial',
          '35kg Ração Gatos Castrados Frango',
          'Desinfetante hospitalar bactericida (50L)',
        ],
        comprovante: 'DANFE NF-e nº 004.620',
      },
    ],
    relatorios: [
      {
        id: 'rel-trim-3',
        tipo: 'relatorio',
        titulo: 'Balanço do 3º Trimestre 2026',
        data: '30/09/2026',
        emissor: 'Tesouraria da ONG',
        cnpj: '04.912.834/0001-55',
        valor: 'R$ 12.450,00',
        resumo: 'Relatório trimestral consolidando jul/ago/set com 12 novos apadrinhamentos e 8 adoções responsáveis.',
        itens: [
          'Total arrecadado no trimestre: R$ 12.450,00',
          'Total aplicado diretamente nos animais: R$ 11.900,00',
          'Reserva de emergência médica: R$ 550,00',
        ],
        comprovante: 'Relatório Financeiro Interno nº 03/2026',
      },
    ],
    eventos: [
      {
        id: 'ev-set-01',
        titulo: 'Feijoada Vegana Solidária',
        data: 'Domingo, 14/09/2026 • das 12h às 15h',
        local: 'Espaço Comunitário Central',
        arrecadacaoBruta: 'R$ 3.100,00',
        custos: 'R$ 600,00',
        saldoLiquido: 'R$ 2.500,00',
        destinacao: 'Recurso destinado à cirurgia ortopédica e internação de 2 cães resgatados.',
        itens: [
          'Venda de 124 marmitas solidárias: R$ 3.100,00',
          'Ingredientes e embalagens ecológicas: - R$ 600,00',
        ],
      },
    ],
  },
};

export const PERIODOS_DISPONIVEIS = Object.keys(TRANSPARENCIA_POR_PERIODO);
