import {
    FunctionContext,
    FunctionEvent,
    FunctionResult,
} from '8base-cli-types';
import gql from 'graphql-tag';

type ResolverResult = FunctionResult<{
    response: string;
}>;
export default async (
    event: FunctionEvent<{ id: string; completed: boolean }>,
    ctx: FunctionContext
): ResolverResult => {
    const { id, completed } = event.data;

    const mutation = gql`
        mutation TodoToggle($id: ID!, $completed: Boolean!) {
            todoUpdate(filter: { id: $id }, data: { completed: $completed }) {
                id
                text
                completed
            }
        }
    `;
    await ctx.api.gqlRequest(mutation, { id, completed });

    return {
        data: { response: 'done' },
    };
};
