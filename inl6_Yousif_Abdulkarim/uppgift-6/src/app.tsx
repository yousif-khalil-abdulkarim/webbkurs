import 'reset-css';
import { 
  lightTheme, 
  Provider, 
  ComboBox,
  useAsyncList,
  TableView,
  Item,
  View,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell
} from '@adobe/react-spectrum';
import { useState } from 'react';

type IAirport = {
  name: string;
  city: string;
  country: string;
  region: string;
}
async function getAirportsByCountry(countryInput: string, signal?: AbortSignal): Promise<IAirport[]> {
  const API_KEY = "jAK7TITUpRTXJ/yJCkbI9g==YK9Y7usHzOod3HTv"
  const url = new URL("https://api.api-ninjas.com/v1/airports")
  url.searchParams.append("country", countryInput)
  const headers = new Headers();
  headers.append("X-Api-Key", API_KEY)
  const request = new Request(url, {
    method: "GET",
    headers,
    signal
  })
  const response = await fetch(request);
  const airports: any[] = await response.json();
  return airports.map<IAirport>((airport: any) => ({
    name: airport.name,
    city: airport.city,
    country: airport.country,
    region: airport.region
  }));
}

type ICountry = {
  name: string;
  code: string;
}
async function getAllCountries(signal?: AbortSignal) {
  const request = new Request("https://restcountries.com/v3.1/all", {
    method: "GET",
    signal
  });
  const response = await fetch(request);
  const json = await response.json() as any[];
  const countries = json.map<ICountry>(country => ({
    name: country.name.common,
    code: country.cca2
  }));
  return countries.sort(({ name: nameA }, { name: nameB }) => nameA < nameB ? -1 : 1);
}

export function App() {
  const countryCodeList = useAsyncList<ICountry>({
    async load({ signal }) {
      return { 
        items: await getAllCountries(signal)
      };
    }
  });
  const [airports, setAirports] = useState<IAirport[]>([])
  return (
    <Provider theme={lightTheme} height="100vh" UNSAFE_style={{
      overflowY: "scroll"
    }}>
      <View
        padding="32px"
        backgroundColor="static-black" 
        UNSAFE_style={{
            top: 0,
            position: "sticky",
            zIndex: 2
        }}
      >
        <ComboBox 
          label="Country"
          defaultItems={countryCodeList.items}
          onSelectionChange={async countryCode => {
            setAirports(await getAirportsByCountry(countryCode.toString()));
          }}
        >
        {item => (
          <Item
            key={item.code}
          >
            {item.name}
          </Item>
        )}
        </ComboBox>
      </View>
      <View padding="32px">
        <TableView aria-label='Airports'>
          <TableHeader>
            <Column>
              Name
            </Column>

            <Column>
              City
            </Column>

            <Column>
              Country
            </Column>

            <Column>
              Region
            </Column>
          </TableHeader>
          <TableBody>
            {airports.map(airport => (
              <Row key={JSON.stringify(airport)}>
                <Cell>
                  {airport.name}
                </Cell>
                
                <Cell>
                  {airport.city}
                </Cell>
                
                <Cell>
                  {airport.country}
                </Cell>

                
                <Cell>
                  {airport.region}
                </Cell>
              </Row>
            ))}
          </TableBody>
        </TableView>
      </View>
    </Provider>
  )
} 