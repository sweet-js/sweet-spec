#lang 'sweet.js';
import { declare } from 'sweet-spec-macro';

declare class Term {}

// Bindings
declare class BindingWithDefault extends Term {
  binding: any;
  init: any;
}

declare class BindingIdentifier extends Term {
  name: any;
}

declare class ArrayBinding extends Term {
  elements: any;
  restElement: any;
}

declare class ObjectBinding extends Term {
  properties: any;
}

declare class BindingPropertyIdentifier extends Term {
  binding: any;
  init: any;
}

declare class BindingPropertyProperty extends Term {
  name: any;
  binding: any;
}

declare class Statement extends Term {}

declare class Expression extends Term {}

// class
declare class ClassExpression extends Expression {
  name: any;
  super: any;
  elements: any;
}

declare class ClassDeclaration extends Statement {
  name: any;
  super: any;
  elements: any;
}

declare class ClassElement extends Term {
  isStatic: any;
  method: any;
}


// modules
declare class Module extends Term {
  directives: any[];
  items : Statement[];
}

declare class Import extends Term {
  moduleSpecifier: any;
  defaultBinding: any;
  namedImports: any;
  forSyntax: any;
}

declare class ImportNamespace extends Term {
  moduleSpecifier: any;
  defaultBinding: any;
  namespaceBinding: any;
  forSyntax: any;
}

declare class ImportSpecifier extends Term {
  name: any;
  binding: any;
}

declare class ExportAllFrom extends Term {
  moduleSpecifier: any;
}

declare class ExportFrom extends Term {
  namedExports: any;
  moduleSpecifier: any;
}

declare class Export extends Term {
  declaration: any;
}

declare class ExportDefault extends Term {
  body: any;
}

declare class ExportSpecifier extends Term {
  name: any;
  exportedName: any;
}


// property definition
declare class Method extends Term {
  name: any;
  body: any;
  isGenerator: any;
  params: any;
}

declare class Getter extends Term {
  name: any;
  body: any;
}

declare class Setter extends Term {
  name: any;
  body: any;
  param: any;
}

declare class DataProperty extends Term {
  name: any;
  expression: any;
}

declare class ShorthandProperty extends Term {
  name: any;
}

declare class StaticPropertyName extends Term {
  value: any;
}

declare class ComputedPropertyName extends Term {
  expression: any;
}


// literals
declare class LiteralBooleanExpression extends Expression {
  value: any;
}

declare class LiteralInfinityExpression extends Expression { }
declare class LiteralNullExpression extends Expression { }
declare class LiteralNumericExpression extends Expression {
  value: any;
}

declare class LiteralRegExpExpression extends Expression {
  pattern: any;
  flags: any;
}

declare class LiteralStringExpression extends Expression {
  value: any;
}



// expressions
declare class ArrayExpression extends Expression {
  elements: any;
}

declare class ArrowExpression extends Expression {
  params: any;
  body: any;
}

declare class AssignmentExpression extends Expression {
  binding: any;
  expression: any;
}

declare class BinaryExpression extends Expression {
  operator: any;
  left: Expression;
  right: Expression;
}

declare class CallExpression extends Expression {
  callee: Expression;
  arguments: (SpreadElement | Expression)[];
}

declare class ComputedAssignmentExpression extends Expression {
  operator: any;
  binding: any;
  expression: any;
}

declare class ComputedMemberExpression extends Expression {
  object: any;
  expression: any;
}

declare class ConditionalExpression extends Expression {
  test: any;
  consequent: any;
  alternate: any;
}

declare class FunctionExpression extends Expression {
  name: any;
  isGenerator: any;
  params: any;
  body: any;
}

declare class IdentifierExpression extends Expression {
  name: any;
}

declare class NewExpression extends Expression {
  callee: any;
  arguments: any;
}

declare class NewTargetExpression extends Expression { }
declare class ObjectExpression extends Expression {
  properties: any;
}

declare class UnaryExpression extends Expression {
  operator: any;
  operand: Expression;
}

declare class StaticMemberExpression extends Expression {
  object: any;
  property: any;
}

declare class TemplateExpression extends Expression {
  tag: any;
  elements: any;
}

declare class ThisExpression extends Expression {
  stx: any
}

declare class UpdateExpression extends Expression {
  isPrefix: any;
  operator: any;
  operand: BindingIdentifier;
}

declare class YieldExpression extends Expression {
  expression: any;
}

declare class YieldGeneratorExpression extends Expression {
  expression: any;
}

declare class ParenthesizedExpression extends Expression {
  inner: any;
}


// statements
declare class BlockStatement extends Statement {
  block: any;
}

declare class BreakStatement extends Statement {
  label: any;
}

declare class ContinueStatement extends Statement {
  label: any;
}

declare class CompoundAssignmentExpression extends Statement {
  binding: any;
  operator: any;
  expression: any;
}

declare class DebuggerStatement extends Statement { }
declare class DoWhileStatement extends Statement {
  test: any;
  body: any;
}

declare class EmptyStatement extends Statement { }
declare class ExpressionStatement extends Statement {
  expression : Expression;
}

declare class ForInStatement extends Statement {
  left: any;
  right: any;
  body: any;
}

declare class ForOfStatement extends Statement {
  left: any;
  right: any;
  body: any;
}

declare class ForStatement extends Statement {
  init: any;
  test: any;
  update: any;
  body: any;
}

declare class IfStatement extends Statement {
  test: any;
  consequent: any;
  alternate: any;
}

declare class LabeledStatement extends Statement {
  label: any;
  body: any;
}

declare class ReturnStatement extends Statement {
  expression: any;
}

declare class SwitchStatement extends Statement {
  discriminant: any;
  cases: any;
}

declare class SwitchStatementWithDefault extends Statement {
  discriminant: any;
  preDefaultCases: any;
  defaultCase: any;
  postDefaultCases: any;
}

declare class ThrowStatement extends Statement {
  expression: any;
}

declare class TryCatchStatement extends Statement {
  body: any;
  catchClause: any;
}

declare class TryFinallyStatement extends Statement {
  body: any;
  catchClause: any;
  finalizer: any;
}

declare class VariableDeclarationStatement extends Statement {
  declaration: any;
}

declare class WithStatement extends Statement {
  object: any;
  body: any;
}

declare class WhileStatement extends Statement {
  test: any;
  body: any;
}


// other
declare class Pragma extends Term {
  kind: any;
  items: any;
}

declare class Block extends Term {
  statements: any;
}

declare class CatchClause extends Term {
  binding: any;
  body: any;
}

declare class Directive extends Term {
  rawValue: any;
}

declare class FormalParameters extends Term {
  items: any;
  rest: any;
}

declare class FunctionBody extends Term {
  directives: any;
  statements: any;
}

declare class FunctionDeclaration extends Statement {
  name: any;
  isGenerator: any;
  params: any;
  body: any;
}

declare class Script extends Term {
  directives: any;
  statements: any;
}

declare class SpreadElement extends Term {
  expression: Expression;
}

declare class Super extends Term { }
declare class SwitchCase extends Term {
  test: any;
  consequent: any;
}

declare class SwitchDefault extends Term {
  consequent: any;
}

declare class TemplateElement extends Term {
  rawValue: any;
}

declare class SyntaxTemplate extends Term {
  template: any;
}

declare class SyntaxQuote extends Term {
  name: any;
  template: any;
}

declare class VariableDeclaration extends Term {
  kind: any;
  declarators: any;
}

declare class VariableDeclarator extends Term {
  binding: any;
  init: any;
}
