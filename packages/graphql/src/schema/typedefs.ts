import gql from "graphql-tag";

const fs = require("fs");
const path = require("path");

//function that imports .graphql files
const importGraphQL = (file: any) => {
  return fs.readFileSync(path.join(__dirname, file), "utf-8");
};

const ROUTES_GQL = importGraphQL("../../schema/Routes.graphql");
const FEEDBACK_GQL = importGraphQL("../../schema/Feedback.graphql");
const SCALARS_GQL = importGraphQL("../../schema/Scalars.graphql");
const USERS_GQL = importGraphQL("../../schema/Users.graphql");

export const GQL_SCHEMA_FILES = [
  ROUTES_GQL,
  FEEDBACK_GQL,
  SCALARS_GQL,
  USERS_GQL,
];

// Initialise typeDefs
export const typeDefs = gql`
  ${GQL_SCHEMA_FILES}
`;
