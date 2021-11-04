import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface Props {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export default function HighlightCard({
  title,
  amount,
  lastTransaction,
  type,
}: Props) {
  console.log(amount);
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        {amount !== "R$0,00" ? (
          <LastTransaction type={type}>{lastTransaction}</LastTransaction>
        ) : null}
      </Footer>
    </Container>
  );
}
