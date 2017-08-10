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
  body: FunctionBody;
}

/* ***** Bindings ***** */

// type Binding = (ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression);

declare export class BindingWithDefault extends Term {
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  init: Expression;
}

declare export class BindingIdentifier extends Term {
  name: any;
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
  isStatic: any;
  method: MethodDefinition;
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
  isAsync: any;
  isGenerator: any;
  params: FormalParameters;
}

declare export class Getter extends MethodDefinition { }

declare export class Setter extends MethodDefinition {
  param: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault;
  // param: Binding or BindingWithDefault;
}

declare export class DataProperty extends NamedObjectProperty {
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
  isAsync: any;
  params: FormalParameters;
  body: FunctionBody | Expression;
}
declare export class ArrowExpressionE extends Expression {
  isAsync: any;
  params: FormalParameters;
  body: Term[];
}

declare export class AssignmentExpression extends Expression {
  // binding: Binding;
  binding: BindingIdentifier | BindingPropertyProperty | BindingPropertyIdentifier | ObjectBinding | ArrayBinding | MemberExpression;
  expression: Expression;
}

declare export class BinaryExpression extends Expression {
  operator: any;
  left: Expression;
  right: Expression;
}

declare export class CallExpression extends Expression {
  callee: Expression | Super;
  arguments: (SpreadElement | Expression)[];
}

declare export class CallExpressionE extends Expression {
  callee: Expression | Super;
  arguments: Term[];
}

declare export class CompoundAssignmentExpression extends Expression {
  binding: BindingIdentifier | MemberExpression;
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
  operand: BindingIdentifier | MemberExpression;
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
  left: VariableDeclaration | ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
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
  // items: (Binding | BindingWithDefault)[];
  items: (ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault)[];
  rest?: BindingIdentifier;
}

declare export class FunctionBody extends Term {
  directives: any[];
  statements: Statement[];
}

declare export class FunctionDeclaration extends Statement {
  name: BindingIdentifier;
  isAsync: any; // boolean
  isGenerator: any;
  params: FormalParameters;
  body: FunctionBody;
}
declare export class FunctionDeclarationE extends Statement {
  name: BindingIdentifier;
  isAsync: any; // boolean
  isGenerator: any;
  params: FormalParameters;
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
  init?: Expression;
}

declare export class OperatorDeclarator extends VariableDeclarator {
  prec: any;
  assoc: any;
}
