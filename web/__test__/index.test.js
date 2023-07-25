import { render, screen } from '@testing-library/react'
import Search from '../src/components/Search/Search'
import Card from '../src/components/Card/Card'
import Details from '../src/components/Details/Details'
import Home from '../src/app/page'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import '@testing-library/jest-dom'
import { Pokemon, Pokemons, fetchPokemons } from '../src/utils/api';
import { ditto } from '../src/utils/helpers'

const mockedPokemonsQuery = fetchPokemons;
// TODO Implementar el mock de la función para el fetch de Pokemons
jest.mock("../src/utils/api");

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
export default wrapper;


/*describe('Home page', () => {
    const queryClient = new QueryClient();
    it('displays the initial list of Pokemons', () => {
        mockedPokemonsQuery.mockImplementation(() => ({
            status: "loading",
        }));
        render(<Home />, { wrapper });
        expect(screen.getByRole("div")).toBeInTheDocument();
    })
})*/

describe('Search component', () => {
    const queryClient = new QueryClient();
    it('renders with the correct placeholder text', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Search />
            </QueryClientProvider>
        )

        const input = screen.getByPlaceholderText('Buscar Pokemon')

        expect(input).toBeInTheDocument();
    })
})

/*describe('Card component', () => {
    const queryClient = new QueryClient();
    it('renders with the correct placeholder text', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Card pokemon={{
                    name: "bulbasaur",
                    url: "https://pokeapi.co/api/v2/pokemon/1/"
                }} />
            </QueryClientProvider>
        )

        const btn = screen.getAllByRole('heading')

        expect(btn).toBeInTheDocument();
    })
})*/

describe('Details component', () => {
    const queryClient = new QueryClient();
    it('ensure that a Pokemons info shows properly', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Details data={ditto}/>
            </QueryClientProvider>
        )

        const spanName = screen.getByRole('name');

        expect(spanName).toHaveTextContent(ditto.name);
    })
})