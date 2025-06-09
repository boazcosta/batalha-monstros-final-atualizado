// Importa o arquivo de estilos globais que será aplicado em toda a aplicação
import '../styles/globals.css'
// Traz o tipo AppProps do Next.js, que define as props padrão para o componente App
import type { AppProps } from 'next/app'
/**
 * Componente MyApp
 * É o ponto de entrada de todas as páginas do Next.js.
 * @param Component — componente da página que está sendo renderizada
 * @param pageProps — propriedades específicas dessa página
 */
function MyApp({ Component, pageProps }: AppProps) {
  // Renderiza o componente da página atual e espalha (spread) todas as suas props
  return <Component {...pageProps} />
}
// Exporta o MyApp como padrão para que o Next.js o utilize como wrapper global
export default MyApp
