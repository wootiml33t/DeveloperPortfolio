import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const AppContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  align-items: center;
  z-index: 1;
  background: ${({ theme }) => `${theme.colors.background}CC`};
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </Main>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
