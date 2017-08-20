#lang 'sweet.js';
import { declare } from 'sweet-spec-macro';

declare export default class Term {}

/* **** SyntaxTerms **** */

declare export class SyntaxTerm extends Term {}
declare export class RawDelimiter extends SyntaxTerm {
  kind: any; // 'parens' | 'square' | 'curly'
  inner: Term[];
}
declare export class RawSyntax extends SyntaxTerm {
  value: any; // Syntax
}

/* ***** Term Kinds ***** */

declare export class Statement extends Term {}
declare export class IterationStatement extends Statement {
  body: Statement;
}

declare export class Expression extends Term {}
declare export class MemberExpression extends Expression {
  object: Expression | Super;
}

declare export class PropertyName extends Term {}
declare export class ObjectProperty extends Term {}
declare export class NamedObjectProperty extends ObjectProperty {
  name: PropertyName;
}
declare export class MethodDefinition extends NamedObjectProperty {
  type?: TypeNode;
  body: FunctionBody;
}

declare export class AbstractMethodDefinition extends Term {
  name: PropertyName;
  type?: TypeNode;
}

declare export class VariableReference extends Term {
  name: any; // Identifier (string)
}

/* ***** Bindings ***** */

// type Binding = (ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression);

declare export class BindingWithDefault extends Term {
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  init: Expression;
}

declare export class BindingIdentifier extends VariableReference { }

declare export class AssignmentTargetIdentifier extends VariableReference { }

declare export class MemberAssignmentTarget extends Term {
  object: Expression | Super;
}

declare export class ComputedMemberAssignmentTarget extends MemberAssignmentTarget {
  expression: Expression;
}

declare export class StaticMemberAssignmentTarget extends MemberAssignmentTarget {
  property: any;
}

declare export class ArrayBinding extends Term {
  // elements: (Binding | BindingWithDefault)[];
  elements: (ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault | null)[];
  // restElement?: Binding
  rest?: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
}

declare export class ObjectBinding extends Term {
  properties: BindingProperty[];
}

declare export class BindingProperty extends Term {}

declare export class BindingPropertyIdentifier extends BindingProperty {
  binding: BindingIdentifier;
  init?: Expression;
}

declare export class BindingPropertyProperty extends BindingProperty {
  name: PropertyName;
  // binding: Binding | BindingWithDefault;
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault;
}

/*
  AssignmentTarget =
      ObjectAssignmentTarget
    | ArrayAssignmentTarget
    | AssignmentTargetIdentifier
    | MemberAssignmentTarget
*/

declare export class AssignmentTargetWithDefault extends Term {
  binding: ObjectAssignmentTarget | ArrayAssignmentTarget | AssignmentTargetIdentifier | MemberAssignmentTarget;
  init: Expression;
}


declare export class ArrayAssignmentTarget extends Term {
  elements: (ObjectAssignmentTarget | ArrayAssignmentTarget | AssignmentTargetIdentifier | MemberAssignmentTarget | AssignmentTargetWithDefault | null)[];
  rest?: ObjectAssignmentTarget | ArrayAssignmentTarget | AssignmentTargetIdentifier | MemberAssignmentTarget;
}

declare export class ObjectAssignmentTarget extends Term {
  properties?: AssignmentTargetProperty[];
}

declare export class AssignmentTargetProperty extends Term { }

declare export class AssignmentTargetPropertyIdentifier extends AssignmentTargetProperty {
  binding: AssignmentTargetIdentifier;
  init?: Expression;
}

declare export class AssignmentTargetPropertyProperty extends AssignmentTargetProperty {
  name: PropertyName;
  binding?: ObjectAssignmentTarget | ArrayAssignmentTarget | AssignmentTargetIdentifier | MemberAssignmentTarget | AssignmentTargetWithDefault;
}



// class
declare export class ClassExpression extends Expression {
  name?: BindingIdentifier;
  typeParameters?: TypeParameterDeclaration[];
  heritageClauses?: HeritageClause[];
  elements: (ClassElement | IndexSignatureDeclaration)[];
}

declare export class ClassDeclaration extends Statement {
  isAbstract: any; // boolean
  name: BindingIdentifier;
  typeParameters?: TypeParameterDeclaration[];
  heritageClauses?: HeritageClause[];
  elements: (ClassElement | IndexSignatureDeclaration)[];
}

declare export class ClassElement extends Term {
  isStatic: any; // boolean
  accessModifier: any; // 'public' | 'protected' | 'private'
}

declare export class MethodClassElement extends ClassElement {
  hasQuestionToken: any; // boolean
  method: MethodDefinition;
}

declare export class AbstractMethodClassElement extends ClassElement {
  hasQuestionToken: any; // boolean
  method: AbstractMethodDefinition;
}

declare export class ConstructorClassElement extends ClassElement {
  params: ConstructorFormalParameters;
  body: FunctionBody;
}

declare export class ConstructorFormalParameters extends Term {
  items: ConstructorParameterDeclaration[];
  rest?: ParameterDeclaration;
}

declare export class ConstructorParameterDeclaration extends Term {
  accessModifier?: any; // 'public' | 'protected' | 'private'
  hasReadonlyModifier: any; // boolean
  parameter: ParameterDeclaration;
}

declare export class SemicolonClassElement extends ClassElement {}

declare export class PropertyDeclaration extends ClassElement {
  hasReadonlyModifier: any; // boolean
  name: PropertyName;
  hasQuestionToken: any; // boolean
  type?: TypeNode;
  initializer?: Expression;
}



// interface

declare export class InterfaceDeclaration extends Statement {
  name: BindingIdentifier;
  typeParameters?: TypeParameterDeclaration[];
  heritageClauses?: HeritageClause[];
  elements: (TypeElement | IndexSignatureDeclaration)[];
}

declare export class TypeElement extends Term {}

declare export class FunctionSignatureLikeTypeElement extends TypeElement {
  typeParameters?: TypeParameterDeclaration[];
  params: FormalParameters;
  type?: TypeNode;
}

declare export class MethodSignature extends FunctionSignatureLikeTypeElement {
  name: PropertyName;
}

declare export class CallSignatureDeclaration extends FunctionSignatureLikeTypeElement {}

declare export class ConstructorSignatureDeclaration extends FunctionSignatureLikeTypeElement {
  // note: TypeScript does not allow ConstructorFormalParameters here
}

declare export class PropertySignature extends TypeElement {
  hasReadonlyModifier: any; // boolean
  name: PropertyName;
  hasQuestionToken: any; // boolean
  type?: TypeNode;
}



// common for classes and interfaces

declare export class HeritageClause extends Term {
  parent?: ClassExpression | ClassDeclaration | InterfaceDeclaration;
  types: ExpressionWithTypeArguments[];
}
declare export class ExtendsClause extends HeritageClause {}
declare export class ImplementsClause extends HeritageClause {}

declare export class IndexSignatureDeclaration extends Term {
  parent?: ClassExpression | ClassDeclaration | InterfaceDeclaration | TypeLiteralNode;
  parameter: ParameterDeclaration;
  valueType: TypeNode;
}



// type alias

declare export class TypeAliasDeclaration extends Statement {
  name: BindingIdentifier;
  typeParameters?: TypeParameterDeclaration[];
  type: TypeNode;
}



// enum

declare export class EnumDeclaration extends Statement {
  name: BindingIdentifier;
  elements: EnumElement[];
}

declare export class EnumElement extends Term {
  parent?: EnumDeclaration;
  name: PropertyName;
  initializer?: Expression;
}



// modules
declare export class Module extends Term {
  directives: any[];
  items : Term[];
}

declare export class ImportDeclaration extends Term {
  moduleSpecifier: any;
  forSyntax: any;
}

declare export class ExportDeclaration extends Term {}

declare export class Import extends ImportDeclaration {
  defaultBinding?: BindingIdentifier;
  namedImports: ImportSpecifier[];
}

declare export class ImportNamespace extends ImportDeclaration {
  defaultBinding?: BindingIdentifier;
  namespaceBinding: BindingIdentifier;
}

declare export class ImportSpecifier extends Term {
  name?: any;
  binding: BindingIdentifier;
}

declare export class ExportAllFrom extends ExportDeclaration {
  moduleSpecifier: any;
}

declare export class ExportFrom extends ExportDeclaration {
  namedExports: ExportFromSpecifier[];
  moduleSpecifier?: any;
}

declare export class ExportLocals extends ExportDeclaration {
  namedExports: ExportLocalSpecifier[];
}

declare export class Export extends ExportDeclaration {
  declaration: FunctionDeclaration | ClassDeclaration | VariableDeclaration;
}

declare export class ExportDefault extends ExportDeclaration {
  body: FunctionDeclaration | ClassDeclaration | Expression;
}

declare export class ExportFromSpecifier extends Term {
  name: any;
  exportedName?: any;
}

declare export class ExportLocalSpecifier extends Term {
  name: IdentifierExpression;
  exportedName?: any;
}


// property definition
declare export class Method extends MethodDefinition {
  parent?: ClassExpression | ClassDeclaration | ObjectExpression;
  isAsync: any;
  isGenerator: any;
  params: FormalParameters;
}

declare export class AbstractMethod extends AbstractMethodDefinition {
  parent?: ClassExpression | ClassDeclaration;
  isAsync: any; // boolean
  isGenerator: any; // boolean
  params: FormalParameters;
}

declare export class Getter extends MethodDefinition {
  parent?: ClassExpression | ClassDeclaration | ObjectExpression;
}

declare export class AbstractGetter extends AbstractMethodDefinition {
  parent?: ClassExpression | ClassDeclaration;
}

declare export class Setter extends MethodDefinition {
  parent?: ClassExpression | ClassDeclaration | ObjectExpression;
  param: ParameterDeclaration;
}

declare export class AbstractSetter extends AbstractMethodDefinition {
  parent?: ClassExpression | ClassDeclaration;
  param: ParameterDeclaration;
}

declare export class DataProperty extends NamedObjectProperty {
  hasQuestionToken: any; // boolean
  expression: Expression;
}

declare export class ShorthandProperty extends ObjectProperty {
  name: IdentifierExpression;
}

declare export class StaticPropertyName extends PropertyName {
  value: any;
}

declare export class ComputedPropertyName extends PropertyName {
  expression: Expression;
}


// literals
declare export class LiteralBooleanExpression extends Expression {
  value: any;
}

declare export class LiteralInfinityExpression extends Expression { }
declare export class LiteralNullExpression extends Expression { }
declare export class LiteralNumericExpression extends Expression {
  value: any;
}

declare export class LiteralRegExpExpression extends Expression {
  pattern: any;
  global: any;
  ignoreCase: any;
  multiline: any;
  sticky: any;
  unicode: any;
}

declare export class LiteralStringExpression extends Expression {
  value: any;
}



// expressions
declare export class ArrayExpression extends Expression {
  elements: (SpreadElement | Expression | null)[];
}

declare export class ArrowExpression extends Expression {
  isAsync: any; // boolean
  isGenerator: any; // boolean
  typeParameters?: TypeParameterDeclaration[];
  params: FormalParameters;
  type?: TypeNode;
  body: FunctionBody | Expression;
}
declare export class ArrowExpressionE extends Expression {
  isAsync: any; // boolean
  isGenerator: any; // boolean
  typeParameters?: TypeParameterDeclaration[];
  params: FormalParameters;
  type?: TypeNode;
  body: Term[];
}

declare export class AssignmentExpression extends Expression {
  // binding: Binding;
  binding: ObjectAssignmentTarget | ArrayAssignmentTarget | AssignmentTargetIdentifier | MemberAssignmentTarget;
  expression: Expression;
}

declare export class BinaryExpression extends Expression {
  operator: any;
  left: Expression;
  right: Expression;
}

declare export class CallExpression extends Expression {
  callee: Expression | Super;
  typeArguments?: TypeNode[];
  arguments: (SpreadElement | Expression)[];
}
declare export class CallExpressionE extends Expression {
  callee: Expression | Super;
  typeArguments?: TypeNode[];
  arguments: Term[];
}

declare export class CompoundAssignmentExpression extends Expression {
  binding: AssignmentTargetIdentifier | MemberAssignmentTarget;
  operator: any;
  expression: Expression;
}

declare export class ComputedMemberExpression extends MemberExpression {
  expression: Expression;
}

declare export class ConditionalExpression extends Expression {
  test: Expression;
  consequent: Expression;
  alternate: Expression;
}

declare export class FunctionExpression extends Expression {
  name?: BindingIdentifier;
  isAsync: any; // boolean
  isGenerator: any;
  params: FormalParameters;
  body: FunctionBody;
}
declare export class FunctionExpressionE extends Expression {
  name?: BindingIdentifier;
  isAsync: any; // boolean
  isGenerator: any;
  params: FormalParameters;
  body: Term[];
}

declare export class IdentifierExpression extends Expression {
  name: any;
}

declare export class NewExpression extends Expression {
  callee: Expression;
  typeArguments?: TypeNode[];
  arguments: (SpreadElement | Expression)[];
}

declare export class NewTargetExpression extends Expression { }
declare export class ObjectExpression extends Expression {
  properties: ObjectProperty[];
}

declare export class UnaryExpression extends Expression {
  operator: any;
  operand: Expression;
}

declare export class StaticMemberExpression extends MemberExpression {
  property: any;
}

declare export class TemplateExpression extends Expression {
  tag?: Expression;
  elements: (Expression | TemplateElement)[];
}

declare export class ThisExpression extends Expression {
  stx: any
}

declare export class UpdateExpression extends Expression {
  isPrefix: any;
  operator: any;
  operand: AssignmentTargetIdentifier | MemberAssignmentTarget;
}

declare export class YieldExpression extends Expression {
  expression?: Expression;
}

declare export class YieldGeneratorExpression extends Expression {
  expression: Expression;
}

declare export class AwaitExpression extends Expression {
  expression: Expression;
}

declare export class ParenthesizedExpression extends Expression {
  inner: any;
}

declare export class AsExpression extends Expression {
  expression: Expression;
  type: TypeNode;
}

declare export class TypeAssertion extends UnaryExpression {
  type: TypeNode;
  expression: UnaryExpression;
}

// statements
declare export class BlockStatement extends Statement {
  block: Block;
}

declare export class BreakStatement extends Statement {
  label?: any;
}

declare export class ContinueStatement extends Statement {
  label?: any;
}


declare export class DebuggerStatement extends Statement { }
declare export class DoWhileStatement extends IterationStatement {
  test: Expression;
}

declare export class EmptyStatement extends Statement { }
declare export class ExpressionStatement extends Statement {
  expression : Expression;
}

declare export class ForInStatement extends IterationStatement {
  left: VariableDeclaration | ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  right: Expression;
}

declare export class ForOfStatement extends IterationStatement {
  left: VariableDeclaration | ObjectAssignmentTarget | ArrayAssignmentTarget | AssignmentTargetIdentifier | MemberAssignmentTarget;
  right: Expression;
}

declare export class ForStatement extends IterationStatement {
  init?: VariableDeclaration | Expression;
  test?: Expression;
  update?: Expression;
}

declare export class IfStatement extends Statement {
  test: Expression;
  consequent: Statement;
  alternate?: Statement;
}

declare export class LabeledStatement extends Statement {
  label: any;
  body: Statement;
}

declare export class ReturnStatement extends Statement {
  expression?: Expression;
}

declare export class SwitchStatement extends Statement {
  discriminant: Expression;
  cases: SwitchCase[];
}

declare export class SwitchStatementWithDefault extends Statement {
  discriminant: Expression;
  preDefaultCases: SwitchCase[];
  defaultCase: SwitchDefault;
  postDefaultCases: SwitchCase[];
}

declare export class ThrowStatement extends Statement {
  expression: Expression;
}

declare export class TryCatchStatement extends Statement {
  body: Block;
  catchClause: CatchClause;
}

declare export class TryFinallyStatement extends Statement {
  body: Block;
  catchClause?: CatchClause;
  finalizer: Block;
}

declare export class VariableDeclarationStatement extends Statement {
  declaration: VariableDeclaration;
}

declare export class WithStatement extends Statement {
  object: Expression;
  body: Statement;
}

declare export class WhileStatement extends IterationStatement {
  test: Expression;
}


// other
declare export class Pragma extends Term {
  kind: any;
  items: any;
}

declare export class Block extends Term {
  statements: Statement[];
}

declare export class CatchClause extends Term {
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  body: Block;
}

declare export class Directive extends Term {
  rawValue: any;
}

declare export class FormalParameters extends Term {
  items: ParameterDeclaration[];
  rest?: ParameterDeclaration;
}

declare export class ParameterDeclaration extends Term {
  // binding: Binding | BindingWithDefault;
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault;
  hasQuestionToken: any; // boolean
  type?: TypeNode;
}

declare export class FunctionBody extends Term {
  directives: any[];
  statements: Statement[];
}

declare export class FunctionDeclaration extends Statement {
  name: BindingIdentifier;
  isAsync: any; // boolean
  isGenerator: any; // boolean
  hasQuestionToken: any; // boolean
  typeParameters?: TypeParameterDeclaration[];
  params: FormalParameters;
  type?: TypeNode;
  body: FunctionBody;
}
declare export class FunctionDeclarationE extends Statement {
  name: BindingIdentifier;
  isAsync: any; // boolean
  isGenerator: any; // boolean
  hasQuestionToken: any; // boolean
  typeParameters?: TypeParameterDeclaration[];
  params: FormalParameters;
  type?: TypeNode;
  body: Term[];
}

declare export class Script extends Term {
  directives: any[];
  statements: Statement[];
}

declare export class SpreadElement extends Term {
  expression: Expression;
}

declare export class Super extends Term { }
declare export class SwitchCase extends Term {
  test: Expression;
  consequent: Statement[];
}

declare export class SwitchDefault extends Term {
  consequent: Statement[];
}

declare export class TemplateElement extends Term {
  rawValue: any;
}

declare export class SyntaxTemplate extends Expression {
  template: SyntaxTerm[];
}

declare export class SyntaxQuote extends Term {
  name: any;
  template: any;
}

declare export class VariableDeclaration extends Term {
  kind: any;
  declarators: VariableDeclarator[];
}

declare export class VariableDeclarator extends Term {
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  // binding: Binding;
  type?: TypeNode;
  init?: Expression;
}

declare export class OperatorDeclarator extends VariableDeclarator {
  prec: any;
  assoc: any;
}



// type annotations

declare export class TypeParameterDeclaration extends Term {
  parent?: ClassExpression | ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration | ArrowExpression | FunctionDeclaration | SignatureTypeNode | MappedTypeNode;
  name: any; // Identifier
  constraint?: TypeNode;
  default?: TypeNode;
}

declare export class TypeNode extends Term {}

// Note: TypeScript also has a separate ThisTypeNode interface that is
//       not reflected here
declare export class KeywordTypeNode extends TypeNode {
  kind: any; // 'any' | 'number' | 'object' | 'boolean' | 'string' | 'symbol' |
             // 'this' | 'void' | 'undefined' | 'null' | 'never'
}

// type FunctionOrConstructorTypeNode = FunctionTypeNode | ConstructorTypeNode
declare export class SignatureTypeNode extends TypeNode {
  typeParameters?: TypeParameterDeclaration[];
  params: FormalParameters;
  type?: TypeNode;
}
// example: `(i: number, s: string) => boolean`
declare export class FunctionTypeNode extends SignatureTypeNode {}
// example: `new (i: number, s: string) => SomeClass`
declare export class ConstructorNodeType extends SignatureTypeNode {}

// type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments;

declare export class TypeReferenceNode extends TypeNode {
  typeName: any; // Identifier
  typeArguments?: TypeNode[];
}

// example: `SomeMapWithGenericClassValues["key"]<number, string>`
declare export class ExpressionWithTypeArguments extends TypeNode {
  parent?: HeritageClause;
  /*
   * In TypeScript, the "destination" class/interface of a heritage clause is
   * allowed to be an arbitrary `LeftHandSideExpression`` which would perhaps
   * best translate into `AssignmentTarget`. However, in the original version
   * of this spec, the superclass is an arbitrary Expression, so here we retain
   * that permissiveness.
   */
  expression: Expression;
  typeArguments?: TypeNode[];
}

// example 1:
//   `something is string` in a boolean-returning function declared as
//   `function isString(something: any): something is string`
// example 2:
//   `this is string` in a boolean-returning class method declared as
//   `isString(): this is string`
declare export class TypePredicateNode extends TypeNode {
  parameterName: any; //  Identifier | 'this'
  type: TypeNode;
}

// example: `typeof someVariable`
declare export class TypeQueryNode extends TypeNode {
  exprName: any; // Identifier
}

// example: `{ readonly someKey: number }`
declare export class TypeLiteralNode extends TypeNode {
  members: (TypeElement | IndexSignatureDeclaration)[];
}

// example: `string[]`
declare export class ArrayTypeNode extends TypeNode {
  elementType: TypeNode;
}

// example: `[string, number]`
declare export class TupleTypeNode extends TypeNode {
  elementTypes: TypeNode[];
}

// example: `number | string`
declare export class UnionTypeNode extends TypeNode {
  types: TypeNode[];
}

// example: `number & string`
declare export class IntersectionTypeNode extends TypeNode {
  types: TypeNode[];
}

// example: `(number)`
declare export class ParenthesizedTypeNode extends TypeNode {
  type: TypeNode;
}

// example: `keyof { a: number, b: string }`
declare export class TypeOperatorNode extends TypeNode {
  operator: any; // 'keyof'
  type: TypeNode;
}

// example:
//   `SomeClass[number]`
//   where
//   `class SomeClass { [index: number]: string }`
declare export class IndexedAccessTypeNode extends TypeNode {
  objectType: TypeNode;
  indexType: TypeNode;
}

// example: `{ readonly [K in "some" | "permissible" | "keys"]: string }`
declare export class MappedTypeNode extends TypeNode {
  parent?: TypeAliasDeclaration;
  hasReadonlyToken: any; // boolean
  typeParameter: TypeParameterDeclaration;
  hasQuestionToken: any; // boolean
  type?: TypeNode;
}

// examples: `"someValue"`, `42`, `null`, `false`
declare export class LiteralTypeNode extends TypeNode {
  literal: Expression;
}
