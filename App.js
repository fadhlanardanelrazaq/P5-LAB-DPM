import React, { useState } from "react";
import {
  Text,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Icon,
  HStack,
  ScrollView,
  Image,
  Pressable,
  Input,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#edf2f7",
      100: "#dbe2ea",
      200: "#b9c5d2",
      300: "#94a7bb",
      400: "#728aa3",
      500: "#4a6686",
      600: "#3a506b",
      700: "#2c3e56",
      800: "#1e2c41",
      900: "#121d2e",
    },
    accent: {
      500: "#007bff",
    },
  },
});

const clubList = [
  {
    id: "1",
    name: "Real Madrid",
    description: "One of the most successful football clubs in the world.",
    founded: "1902",
    stadium: "Santiago Bernabéu",
    trophies: 35,
    image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  },
  {
    id: "2",
    name: "Manchester United",
    description: "A legendary club with a rich history in English football.",
    founded: "1878",
    stadium: "Old Trafford",
    trophies: 20,
    image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  },
  {
    id: "3",
    name: "FC Barcelona",
    description: "Famous for its attacking football and La Masia academy.",
    founded: "1899",
    stadium: "Spotify Camp Nou",
    trophies: 26,
    image: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  },
  {
    id: "4",
    name: "Bayern Munich",
    description: "The most successful club in German football history.",
    founded: "1900",
    stadium: "Allianz Arena",
    trophies: 32,
    image: "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_Munchen_logo_%282017%29.svg",
  },
  {
    id: "5",
    name: "Liverpool",
    description: "A dominant force in English football with a rich history.",
    founded: "1892",
    stadium: "Anfield",
    trophies: 19,
    image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
  {
    id: "6",
    name: "Juventus",
    description: "The most successful club in Italian football.",
    founded: "1897",
    stadium: "Allianz Stadium",
    trophies: 36,
    image: "https://upload.wikimedia.org/wikipedia/en/d/d2/Juventus_FC_2017_logo.svg",
  },
  {
    id: "7",
    name: "Paris Saint-Germain",
    description: "A dominant force in French football.",
    founded: "1970",
    stadium: "Parc des Princes",
    trophies: 10,
    image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  },
  {
    id: "8",
    name: "Chelsea",
    description: "Known for its strong defense and modern success.",
    founded: "1905",
    stadium: "Stamford Bridge",
    trophies: 6,
    image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  },
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function HomeScreen({ navigation }) {
  const [clubs, setClubs] = useState(clubList);
  const [searchText, setSearchText] = useState("");

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Center _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} flex={1}>
      <HStack px={4} py={3} bg="accent.500" alignItems="center" justifyContent="space-between" w="100%">
        <Icon as={MaterialIcons} name="menu" size="lg" color="white" />
        <Heading color="white" size="md">European Clubs</Heading>
        <Icon as={MaterialIcons} name="search" size="lg" color="white" />
      </HStack>

      <Input
        placeholder="Search clubs"
        variant="filled"
        width="90%"
        borderRadius="10"
        py="1"
        px="2"
        my="4"
        InputLeftElement={<Icon as={MaterialIcons} name="search" size="sm" ml="2" color="gray.400" />}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      <ScrollView flex={1} w="100%">
        {filteredClubs.map((item) => (
          <Box
            key={item.id}
            flexDirection="row"
            bg="primary.800"
            _light={{ bg: "primary.100" }}
            borderRadius="md"
            shadow={2}
            mx={4}
            my={2}
            p={3}
          >
            <Image
              source={{ uri: item.image }}
              alt={item.name}
              size="xl"
              borderRadius="md"
            />
            <VStack ml={3} flex={1} justifyContent="space-between">
              <Pressable onPress={() => navigation.navigate('Details', { item })}>
                <Heading size="sm" color="white" _light={{ color: "primary.900" }}>
                  {item.name}
                </Heading>
              </Pressable>
              <Text color="accent.500" fontSize="sm">Founded: {item.founded}</Text>
              <Text color="primary.200" fontSize="xs">Trophies: {item.trophies}</Text>
            </VStack>
          </Box>
        ))}
      </ScrollView>

      <ToggleDarkMode />
    </Center>
  );
}

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <Center flex={1} _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
      <VStack space={4} alignItems="center">
        <Image source={{ uri: item.image }} alt={item.name} size="2xl" borderRadius="md" />
        <Heading color="primary.800" _light={{ color: "primary.900" }}>{item.name}</Heading>
        <Text>{item.description}</Text>
        <Text>Founded: {item.founded}</Text>
        <Text>Stadium: {item.stadium}</Text>
        <Text>Trophies: {item.trophies}</Text>
      </VStack>
    </Center>
  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={4} alignItems="center" py={4}>
      <Text color="primary.500">Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
        offTrackColor="primary.600"
        onTrackColor="accent.500"
        onThumbColor="white"
      />
      <Text color="primary.500">Light</Text>
    </HStack>
  );
}
