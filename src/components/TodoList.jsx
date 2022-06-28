import {
  Box,
  Flex,
  Link,
  chakra,
  HStack,
  Button,
  VStack,
  Input,
  useColorMode,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";

import {
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlusCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const TodoList = ({
  todos,
  toggleStatus,
  addTodo,
  removeTodo,
  clearAllCompleted,
  isAtleastOneCompleted,
}) => {
  const [title, setTitle] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const colorOfTodoTask = useColorModeValue("black", "white");
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            Tasks
          </chakra.span>
          <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{
              bg: "gray.500",
            }}
            onClick={() => addTodo("Sujal is the boss")}
          >
            Sujal Subedi
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode == "dark" ? <FaSun /> : <FaMoon />}
          </Button>
        </Flex>

        <Box mt={2} textAlign="center" p={5}>
          <Link
            fontSize="xl"
            color="gray.700"
            _dark={{
              color: "white",
            }}
            fontWeight="700"
            _hover={{
              color: "gray.600",
              _dark: {
                color: "gray.200",
              },
              textDecor: "underline",
            }}
            p={3}
            m={2}
          >
            Tasks for Today{" "}
          </Link>

          <VStack spacing={"4"} mt={5}>
            {todos &&
              todos.map((todo) => (
                <HStack key={todo.id} opacity={todo.completed ? 0.78 : 1}>
                  <chakra.p
                    textDecoration={todo.completed ? "line-through" : ""}
                    color={todo.completed ? "gray.300" : colorOfTodoTask}
                  >
                    {todo.title}
                  </chakra.p>
                  <Button
                    size="sm"
                    colorScheme={todo.completed ? "green" : "gray"}
                    onClick={() => toggleStatus(todo.id)}
                  >
                    {todo.completed ? <FaToggleOn /> : <FaToggleOff />}
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <FaTrash />
                  </Button>
                </HStack>
              ))}
          </VStack>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Flex alignItems="center">
            <Input
              type="text"
              placeholder={
                todos.length > 9
                  ? "10 tasks are enough "
                  : "Throw mobile into the lake"
              }
              disabled={todos.length > 9}
              m={1}
              border="3px solid green"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Button
              colorScheme={"green"}
              onClick={() => {
                addTodo(title);
                setTitle("");
              }}
              disabled={title.length < 3 || todos.length > 9}
            >
              <FaPlusCircle />
            </Button>
          </Flex>
        </Flex>
        {title.toLocaleLowerCase() == "anjal" ? (
          <chakra.p>
            You mean{" "}
            <Badge
              colorScheme={"green"}
              cursor="pointer"
              onClick={() => setTitle("Anjal King 👑")}
            >
              KING 👑
            </Badge>
          </chakra.p>
        ) : (
          ""
        )}
        <Button
          size="sm"
          margin={"0 auto"}
          colorScheme="yellow"
          mt={6}
          display="block"
          onClick={() => clearAllCompleted()}
          disabled={!isAtleastOneCompleted}
        >
          Clear Completed
        </Button>
      </Box>
    </Flex>
  );
};

export default TodoList;
