/**
 * @swagger
 * components:
 *   schemas:
 *     TheoryItemTypes:
 *       type: string
 *       enum:
 *         - text
 *         - code
 *         - table
 *         - list
 */
export enum TheoryItemEnum {
  Text = "text",
  Code = "code",
  Table = "table",
  List = "list",
}
