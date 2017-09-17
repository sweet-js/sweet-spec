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

declare export class TsAbstractMethodDefinition extends Term {
  name: PropertyName;
  type?: TypeNode;
}

declare export class VariableReference extends Term {
  name: any; // Identifier (string)
}

declare export class ParameterDeclarationBase extends Term {
  // binding: Binding | BindingWithDefault;
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault;
  hasQuestionToken: any; // boolean
  type?: TypeNode;
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
  super?: Expression;
  elements: ClassElement[];
}

declare export class ClassDeclaration extends Statement {
  name: BindingIdentifier;
  super?: Expression;
  elements: ClassElement[];
}

declare export class ClassElement extends Term {
  isStatic: any; // boolean
  method: MethodDefinition;
}

declare export class TsClassExpression extends Expression {
  name?: BindingIdentifier;
  typeParameters?: TsTypeParameterDeclaration[];
  heritageClauses?: TsHeritageClause[];
  elements: (TsClassElement | TsIndexSignatureDeclaration)[];
}

declare export class TsClassDeclaration extends Statement {
  isAbstract: any; // boolean
  name: BindingIdentifier;
  typeParameters?: TsTypeParameterDeclaration[];
  heritageClauses?: TsHeritageClause[];
  elements: (TsClassElement | TsIndexSignatureDeclaration)[];
}

declare export class TsClassElement extends Term {
  isStatic: any; // boolean
  accessModifier?: any; // 'public' | 'protected' | 'private'
}

declare export class TsMethodClassElement extends TsClassElement {
  hasQuestionToken: any; // boolean
  method: MethodDefinition;
}

declare export class TsAbstractMethodClassElement extends TsClassElement {
  hasQuestionToken: any; // boolean
  method: TsAbstractMethodDefinition;
}

declare export class TsConstructorClassElement extends TsClassElement {
  params: TsConstructorFormalParameters;
  body: FunctionBody;
}

declare export class TsConstructorFormalParameters extends Term {
  items: TsConstructorParameterDeclaration[];
  rest?: ParameterDeclaration;
}

declare export class TsConstructorParameterDeclaration extends ParameterDeclarationBase {
  accessModifier?: any; // 'public' | 'protected' | 'private'
  hasReadonlyModifier: any; // boolean
}

declare export class TsPropertyDeclaration extends TsClassElement {
  hasReadonlyModifier: any; // boolean
  name: PropertyName;
  hasQuestionToken: any; // boolean
  type?: TsTypeNode;
  initializer?: Expression;
}



// interface

declare export class InterfaceDeclaration extends Statement {}

declare export class TsInterfaceDeclaration extends InterfaceDeclaration {
  name: BindingIdentifier;
  typeParameters?: TsTypeParameterDeclaration[];
  heritageClauses?: TsHeritageClause[];
  elements: (TsTypeElement | TsIndexSignatureDeclaration)[];
}

// TypeScript interface elements
declare export class TsTypeElement extends TypeElement {}

declare export class FunctionSignatureLikeTsTypeElement extends TsTypeElement {
  typeParameters?: TsTypeParameterDeclaration[];
  params: FormalParameters;
  type?: TsTypeNode;
}

declare export class TsMethodSignature extends FunctionSignatureLikeTsTypeElement {
  name: PropertyName;
}

declare export class TsCallSignatureDeclaration extends FunctionSignatureLikeTsTypeElement {}

declare export class TsConstructorSignatureDeclaration extends FunctionSignatureLikeTsTypeElement {
  // note: TypeScript does not allow TsConstructorFormalParameters here
}

declare export class TsPropertySignature extends TsTypeElement {
  hasReadonlyModifier: any; // boolean
  name: PropertyName;
  hasQuestionToken: any; // boolean
  type?: TsTypeNode;
}



// common for TypeScript classes and interfaces

declare export class TsHeritageClause extends Term {
  parent?: TsClassExpression | TsClassDeclaration | TsInterfaceDeclaration;
  types: ExpressionWithTsTypeArguments[];
}
declare export class TsExtendsClause extends TsHeritageClause {}
declare export class TsImplementsClause extends TsHeritageClause {}

declare export class TsIndexSignatureDeclaration extends Term {
  parent?: TsClassExpression | TsClassDeclaration | TsInterfaceDeclaration | TsTypeLiteralNode;
  parameter: ParameterDeclaration;
  valueType: TsTypeNode;
}



// type alias

declare export class TypeAliasDeclaration extends Statement {}

declare export class TsTypeAliasDeclaration extends TypeAliasDeclaration {
  name: BindingIdentifier;
  typeParameters?: TsTypeParameterDeclaration[];
  type: TypeNode;
}



// enum

declare export class EnumDeclaration extends Statement {}

declare export class TsEnumDeclaration extends EnumDeclaration {
  name: BindingIdentifier;
  elements: TsEnumElement[];
}

declare export class TsEnumElement extends Term {
  parent?: TsEnumDeclaration;
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
  declaration: FunctionDeclaration | ClassDeclaration | TsClassDeclaration | VariableDeclaration;
}

declare export class ExportDefault extends ExportDeclaration {
  body: FunctionDeclaration | ClassDeclaration | TsClassDeclaration | Expression;
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
  parent?: ClassExpression | ClassDeclaration | ObjectExpression | TsClassExpression | TsClassDeclaration;
  isAsync: any;
  isGenerator: any;
  params: FormalParameters;
}

declare export class TsAbstractMethod extends TsAbstractMethodDefinition {
  parent?: TsClassExpression | TsClassDeclaration;
  isAsync: any; // boolean
  isGenerator: any; // boolean
  params: FormalParameters;
}

declare export class Getter extends MethodDefinition {
  parent?: ClassExpression | ClassDeclaration | ObjectExpression | TsClassExpression | TsClassDeclaration;
}

declare export class TsAbstractGetter extends TsAbstractMethodDefinition {
  parent?: TsClassExpression | TsClassDeclaration;
}

declare export class Setter extends MethodDefinition {
  parent?: ClassExpression | ClassDeclaration | ObjectExpression | TsClassExpression | TsClassDeclaration;
  param: ParameterDeclaration;
}

declare export class TsAbstractSetter extends TsAbstractMethodDefinition {
  parent?: TsClassExpression | TsClassDeclaration;
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
  typeParameters?: TypeParameterDeclaration[];
  params: FormalParameters;
  type?: TypeNode;
  body: FunctionBody | Expression;
}
declare export class ArrowExpressionE extends Expression {
  isAsync: any; // boolean
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

declare export class TsAsExpression extends Expression {
  expression: Expression;
  type: TsTypeNode;
}

declare export class TsTypeAssertion extends UnaryExpression {
  type: TsTypeNode;
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

declare export class ParameterDeclaration extends ParameterDeclarationBase {}

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

declare export class TypeNode extends Term {}

declare export class TypeParameterDeclaration extends Term {}

// TypeScript type annotations

declare export class TsTypeNode extends TypeNode {}

declare export class TsTypeParameterDeclaration extends TypeParameterDeclaration {
  parent?: TsClassExpression | TsClassDeclaration | TsInterfaceDeclaration | TsTypeAliasDeclaration | ArrowExpression | FunctionDeclaration | SignatureTsTypeNode | MappedTsTypeNode;
  name: any; // Identifier
  constraint?: TsTypeNode;
  default?: TsTypeNode;
}

// Note: TypeScript also has a separate ThisTypeNode interface that is
//       not reflected here
declare export class TsKeywordTypeNode extends TsTypeNode {
  kind: any; // 'any' | 'number' | 'object' | 'boolean' | 'string' | 'symbol' |
             // 'this' | 'void' | 'undefined' | 'null' | 'never'
}

declare export class SignatureTsTypeNode extends TsTypeNode {
  typeParameters?: TsTypeParameterDeclaration[];
  params: FormalParameters;
  type?: TsTypeNode;
}
// example: `(i: number, s: string) => boolean`
declare export class FunctionTsTypeNode extends SignatureTsTypeNode {}
// example: `new (i: number, s: string) => SomeClass`
declare export class ConstructorTsNodeType extends SignatureTsTypeNode {}

declare export class TsTypeReferenceNode extends TsTypeNode {
  typeName: any; // Identifier
  typeArguments?: TypeNode[];
}

// example: `SomeMapWithGenericClassValues["key"]<number, string>`
declare export class ExpressionWithTsTypeArguments extends TsTypeNode {
  parent?: TsHeritageClause;
  /*
   * In TypeScript, the "destination" class/interface of a heritage clause is
   * allowed to be an arbitrary `LeftHandSideExpression`` which would perhaps
   * best translate into `AssignmentTarget`. However, in the original version
   * of this spec, the superclass is an arbitrary Expression, so here we retain
   * that permissiveness.
   */
  expression: Expression;
  typeArguments?: TsTypeNode[];
}

// example 1:
//   `something is string` in a boolean-returning function declared as
//   `function isString(something: any): something is string`
// example 2:
//   `this is string` in a boolean-returning class method declared as
//   `isString(): this is string`
declare export class TsTypePredicateNode extends TsTypeNode {
  parameterName: any; //  Identifier | 'this'
  type: TsTypeNode;
}

// example: `typeof someVariable`
declare export class TsTypeQueryNode extends TsTypeNode {
  exprName: any; // Identifier
}

// example: `{ readonly someKey: number }`
declare export class TsTypeLiteralNode extends TsTypeNode {
  members: (TsTypeElement | TsIndexSignatureDeclaration)[];
}

// example: `string[]`
declare export class ArrayTsTypeNode extends TsTypeNode {
  elementType: TsTypeNode;
}

// example: `[string, number]`
declare export class TupleTsTypeNode extends TsTypeNode {
  elementTypes: TsTypeNode[];
}

// example: `number | string`
declare export class UnionTsTypeNode extends TsTypeNode {
  types: TsTypeNode[];
}

// example: `number & string`
declare export class IntersectionTsTypeNode extends TsTypeNode {
  types: TsTypeNode[];
}

// example: `(number)`
declare export class ParenthesizedTsTypeNode extends TsTypeNode {
  type: TsTypeNode;
}

// example: `keyof { a: number, b: string }`
declare export class TsTypeOperatorNode extends TsTypeNode {
  operator: any; // 'keyof'
  type: TsTypeNode;
}

// example:
//   `SomeClass[number]`
//   where
//   `class SomeClass { [index: number]: string }`
declare export class IndexedAccessTsTypeNode extends TsTypeNode {
  objectType: TsTypeNode;
  indexType: TsTypeNode;
}

// example: `{ readonly [K in "some" | "permissible" | "keys"]: string }`
declare export class MappedTsTypeNode extends TsTypeNode {
  parent?: TsTypeAliasDeclaration;
  hasReadonlyToken: any; // boolean
  typeParameter: TsTypeParameterDeclaration;
  hasQuestionToken: any; // boolean
  type?: TsTypeNode;
}

// examples: `"someValue"`, `42`, `null`, `false`
declare export class LiteralTsTypeNode extends TsTypeNode {
  literal: Expression;
}
