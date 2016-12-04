#lang 'sweet.js';
import { declare } from 'sweet-spec-macro';

declare class Term {}

/* **** SyntaxTerms **** */

declare class SyntaxTerm extends Term {}
declare class RawDelimiter extends SyntaxTerm {
  kind: any; // 'parens' | 'square' | 'curly'
  inner: Term[];
}
declare class RawSyntax extends SyntaxTerm {
  value: any; // Syntax
}

/* ***** Term Kinds ***** */

declare class Statement extends Term {}
declare class IterationStatement extends Statement {
  body: Statement;
}

declare class Expression extends Term {}
declare class MemberExpression extends Expression {
  object: Expression | Super;
}

declare class PropertyName extends Term {}
declare class ObjectProperty extends Term {}
declare class NamedObjectProperty extends ObjectProperty {
  name: PropertyName;
}
declare class MethodDefinition extends NamedObjectProperty {
  body: FunctionBody;
}

/* ***** Bindings ***** */

// type Binding = (ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression);

declare class BindingWithDefault extends Term {
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  init: Expression;
}

declare class BindingIdentifier extends Term {
  name: any;
}

declare class ArrayBinding extends Term {
  // elements: (Binding | BindingWithDefault)[];
  elements: (ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault | null)[];
  // restElement?: Binding
  restElement?: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
}

declare class ObjectBinding extends Term {
  properties: BindingProperty[];
}

declare class BindingProperty extends Term {}

declare class BindingPropertyIdentifier extends BindingProperty {
  binding: BindingIdentifier;
  init?: Expression;
}

declare class BindingPropertyProperty extends BindingProperty {
  name: PropertyName;
  // binding: Binding | BindingWithDefault;
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault;
}


// class
declare class ClassExpression extends Expression {
  name?: BindingIdentifier;
  super?: Expression;
  elements: ClassElement[];
}

declare class ClassDeclaration extends Statement {
  name: BindingIdentifier;
  super?: Expression;
  elements: ClassElement[];
}

declare class ClassElement extends Term {
  isStatic: any;
  method: MethodDefinition;
}


// modules
declare class Module extends Term {
  directives: any[];
  items : Statement[];
}

declare class Import extends Term {
  moduleSpecifier: any;
  defaultBinding?: BindingIdentifier;
  namedImports: ImportSpecifier[];
  forSyntax: any;
}

declare class ImportNamespace extends Term {
  moduleSpecifier: any;
  defaultBinding?: BindingIdentifier;
  namespaceBinding: BindingIdentifier;
  forSyntax: any;
}

declare class ImportSpecifier extends Term {
  name?: any;
  binding: BindingIdentifier;
}

declare class ExportAllFrom extends Term {
  moduleSpecifier: any;
}

declare class ExportFrom extends Term {
  namedExports: ExportSpecifier[];
  moduleSpecifier?: any;
}

declare class Export extends Term {
  declaration: FunctionDeclaration | ClassDeclaration | VariableDeclaration;
}

declare class ExportDefault extends Term {
  body: FunctionDeclaration | ClassDeclaration | Expression;
}

declare class ExportSpecifier extends Term {
  name?: any;
  exportedName: any;
}


// property definition
declare class Method extends MethodDefinition {
  isGenerator: any;
  params: FormalParameters;
}

declare class Getter extends MethodDefinition { }

declare class Setter extends MethodDefinition {
  param: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault;
  // param: Binding or BindingWithDefault;
}

declare class DataProperty extends NamedObjectProperty {
  expression: Expression;
}

declare class ShorthandProperty extends ObjectProperty {
  name: any;
}

declare class StaticPropertyName extends PropertyName {
  value: any;
}

declare class ComputedPropertyName extends PropertyName {
  expression: Expression;
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
  elements: (SpreadElement | Expression | null)[];
}

declare class ArrowExpression extends Expression {
  params: FormalParameters;
  body: FunctionBody | Expression;
}
declare class ArrowExpressionE extends Expression {
  params: FormalParameters;
  body: Term[];
}

declare class AssignmentExpression extends Expression {
  // binding: Binding;
  binding: BindingIdentifier | BindingPropertyProperty | BindingPropertyIdentifier | ObjectBinding | ArrayBinding | MemberExpression;
  expression: Expression;
}

declare class BinaryExpression extends Expression {
  operator: any;
  left: Expression;
  right: Expression;
}

declare class CallExpression extends Expression {
  callee: Expression | Super;
  arguments: (SpreadElement | Expression)[];
}

declare class CompoundAssignmentExpression extends Expression {
  binding: BindingIdentifier | MemberExpression;
  operator: any;
  expression: Expression;
}

declare class ComputedMemberExpression extends MemberExpression {
  expression: Expression;
}

declare class ConditionalExpression extends Expression {
  test: Expression;
  consequent: Expression;
  alternate: Expression;
}

declare class FunctionExpression extends Expression {
  name?: BindingIdentifier;
  isGenerator: any;
  params: FormalParameters;
  body: FunctionBody;
}
declare class FunctionExpressionE extends Expression {
  name?: BindingIdentifier;
  isGenerator: any;
  params: FormalParameters;
  body: Term[];
}

declare class IdentifierExpression extends Expression {
  name: any;
}

declare class NewExpression extends Expression {
  callee: Expression;
  arguments: (SpreadElement | Expression)[];
}

declare class NewTargetExpression extends Expression { }
declare class ObjectExpression extends Expression {
  properties: ObjectProperty[];
}

declare class UnaryExpression extends Expression {
  operator: any;
  operand: Expression;
}

declare class StaticMemberExpression extends MemberExpression {
  property: any;
}

declare class TemplateExpression extends Expression {
  tag?: Expression;
  elements: (Expression | TemplateElement)[];
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
  expression?: Expression;
}

declare class YieldGeneratorExpression extends Expression {
  expression: Expression;
}

declare class ParenthesizedExpression extends Expression {
  inner: any;
}


// statements
declare class BlockStatement extends Statement {
  block: Block;
}

declare class BreakStatement extends Statement {
  label?: any;
}

declare class ContinueStatement extends Statement {
  label?: any;
}


declare class DebuggerStatement extends Statement { }
declare class DoWhileStatement extends IterationStatement {
  test: Expression;
}

declare class EmptyStatement extends Statement { }
declare class ExpressionStatement extends Statement {
  expression : Expression;
}

declare class ForInStatement extends IterationStatement {
  left: VariableDeclaration | ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  right: Expression;
}

declare class ForOfStatement extends IterationStatement {
  left: VariableDeclaration | ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  right: Expression;
}

declare class ForStatement extends IterationStatement {
  init?: VariableDeclaration | Expression;
  test?: Expression;
  update?: Expression;
}

declare class IfStatement extends Statement {
  test: Expression;
  consequent: Statement;
  alternate?: Statement;
}

declare class LabeledStatement extends Statement {
  label: any;
  body: Statement;
}

declare class ReturnStatement extends Statement {
  expression?: Expression;
}

declare class SwitchStatement extends Statement {
  discriminant: Expression;
  cases: SwitchCase[];
}

declare class SwitchStatementWithDefault extends Statement {
  discriminant: Expression;
  preDefaultCases: SwitchCase[];
  defaultCase: SwitchDefault;
  postDefaultCases: SwitchCase[];
}

declare class ThrowStatement extends Statement {
  expression: Expression;
}

declare class TryCatchStatement extends Statement {
  body: Block;
  catchClause: CatchClause;
}

declare class TryFinallyStatement extends Statement {
  body: Block;
  catchClause?: CatchClause;
  finalizer: Block;
}

declare class VariableDeclarationStatement extends Statement {
  declaration: VariableDeclaration;
}

declare class WithStatement extends Statement {
  object: Expression;
  body: Statement;
}

declare class WhileStatement extends IterationStatement {
  test: Expression;
}


// other
declare class Pragma extends Term {
  kind: any;
  items: any;
}

declare class Block extends Term {
  statements: Statement[];
}

declare class CatchClause extends Term {
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  body: Block;
}

declare class Directive extends Term {
  rawValue: any;
}

declare class FormalParameters extends Term {
  // items: (Binding | BindingWithDefault)[];
  items: (ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression | BindingWithDefault)[];
  rest?: BindingIdentifier;
}

declare class FunctionBody extends Term {
  directives: any[];
  statements: Statement[];
}

declare class FunctionDeclaration extends Statement {
  name: BindingIdentifier;
  isGenerator: any;
  params: FormalParameters;
  body: FunctionBody;
}
declare class FunctionDeclarationE extends Statement {
  name: BindingIdentifier;
  isGenerator: any;
  params: FormalParameters;
  body: Term[];
}

declare class Script extends Term {
  directives: any[];
  statements: Statement[];
}

declare class SpreadElement extends Term {
  expression: Expression;
}

declare class Super extends Term { }
declare class SwitchCase extends Term {
  test: Expression;
  consequent: Statement[];
}

declare class SwitchDefault extends Term {
  consequent: Statement[];
}

declare class TemplateElement extends Term {
  rawValue: any;
}

declare class SyntaxTemplate extends Expression {
  template: SyntaxTerm[];
}

declare class SyntaxQuote extends Term {
  name: any;
  template: any;
}

declare class VariableDeclaration extends Term {
  kind: any;
  declarators: VariableDeclarator[];
}

declare class VariableDeclarator extends Term {
  binding: ObjectBinding | ArrayBinding | BindingIdentifier | MemberExpression;
  // binding: Binding;
  init?: Expression;
}
