#lang 'sweet.js';

import { spec } from 'sweet-spec-macro';

spec Term {}
export default Term;

// Bindings
spec BindingWithDefault : Term {
  binding : base;
  init : base;
}
export { BindingWithDefault };

spec BindingIdentifier : Term {
  name : base;
}
export { BindingIdentifier };

spec ArrayBinding : Term {
  elements : base;
  restElement : base;
}
export { ArrayBinding };

spec ObjectBinding : Term {
  properties : base;
}
export { ObjectBinding };

spec BindingPropertyIdentifier : Term {
  binding : base;
  init : base;
}
export { BindingPropertyIdentifier };

spec BindingPropertyProperty : Term {
  name : base;
  binding : base;
}
export { BindingPropertyProperty };



spec Statement : Term {}
export { Statement };

spec Expression : Term {}
export { Expression };


// class
spec ClassExpression : Expression {
  name : base;
  super : base;
  elements : base;
}
export { ClassExpression };

spec ClassDeclaration : Statement {
  name : base;
  super : base;
  elements : base;
}
export { ClassDeclaration };

spec ClassElement : Term {
  isStatic : base;
  method : base;
}
export { ClassElement };



// modules
spec Module : Term {
  directives : base[];
  items : Statement[];
}
export { Module };

spec Import : Term {
  moduleSpecifier : base;
  defaultBinding : base;
  namedImports : base;
  forSyntax : base;
}
export { Import };

spec ImportNamespace : Term {
  moduleSpecifier : base;
  defaultBinding : base;
  namespaceBinding : base;
  forSyntax : base;
}
export { ImportNamespace };

spec ImportSpecifier : Term {
  name : base;
  binding : base;
}
export { ImportSpecifier };

spec ExportAllFrom : Term {
  moduleSpecifier : base;
}
export { ExportAllFrom };

spec ExportFrom : Term {
  namedExports : base;
  moduleSpecifier : base;
}
export { ExportFrom };

spec Export : Term {
  declaration : base;
}
export { Export };

spec ExportDefault : Term {
  body : base;
}
export { ExportDefault };

spec ExportSpecifier : Term {
  name : base;
  exportedName : base;
}
export { ExportSpecifier };


// property definition
spec Method : Term {
  name : base;
  body : base;
  isGenerator : base;
  params : base;
}
export { Method };

spec Getter : Term {
  name : base;
  body : base;
}
export { Getter };

spec Setter : Term {
  name : base;
  body : base;
  param : base;
}
export { Setter };

spec DataProperty : Term {
  name : base;
  expression : base;
}
export { DataProperty };

spec ShorthandProperty : Term {
  name : base;
}
export { ShorthandProperty };

spec StaticPropertyName : Term {
  value : base;
}
export { StaticPropertyName };

spec ComputedPropertyName : Term {
  expression : base;
}
export { ComputedPropertyName };


// literals
spec LiteralBooleanExpression : Expression {
  value : base;
}
export { LiteralBooleanExpression };

spec LiteralInfinityExpression : Expression { }
spec LiteralNullExpression : Expression { }
spec LiteralNumericExpression : Expression {
  value : base;
}
export { LiteralNumericExpression };

spec LiteralRegExpExpression : Expression {
  pattern : base;
  flags : base;
}
export { LiteralRegExpExpression };

spec LiteralStringExpression : Expression {
  value : base;
}
export { LiteralStringExpression };



// expressions
spec ArrayExpression : Expression {
  elements : base;
}
export { ArrayExpression };

spec ArrowExpression : Expression {
  params : base;
  body : base;
}
export { ArrowExpression };

spec AssignmentExpression : Expression {
  binding : base;
  expression : base;
}
export { AssignmentExpression };

spec BinaryExpression : Expression {
  operator : base;
  left : base;
  right : base;
}
export { BinaryExpression };

spec CallExpression : Expression {
  callee : base;
  arguments : base;
}
export { CallExpression };

spec ComputedAssignmentExpression : Expression {
  operator : base;
  binding : base;
  expression : base;
}
export { ComputedAssignmentExpression };

spec ComputedMemberExpression : Expression {
  object : base;
  expression : base;
}
export { ComputedMemberExpression };

spec ConditionalExpression : Expression {
  test : base;
  consequent : base;
  alternate : base;
}
export { ConditionalExpression };

spec FunctionExpression : Expression {
  name : base;
  isGenerator : base;
  params : base;
  body : base;
}
export { FunctionExpression };

spec IdentifierExpression : Expression {
  name : base;
}
export { IdentifierExpression };

spec NewExpression : Expression {
  callee : base;
  arguments : base;
}
export { NewExpression };

spec NewTargetExpression : Expression { }
spec ObjectExpression : Expression {
  properties : base;
}
export { ObjectExpression };

spec UnaryExpression : Expression {
  operator : base;
  operand : base;
}
export { UnaryExpression };

spec StaticMemberExpression : Expression {
  object : base;
  property : base;
}
export { StaticMemberExpression };

spec TemplateExpression : Expression {
  tag : base;
  elements : base;
}
export { TemplateExpression };

spec ThisExpression : Expression {
  stx : base
}
export { ThisExpression };

spec UpdateExpression : Expression {
  isPrefix : base;
  operator : base;
  operand : base;
}
export { UpdateExpression };

spec YieldExpression : Expression {
  expression : base;
}
export { YieldExpression };

spec YieldGeneratorExpression : Expression {
  expression : base;
}
export { YieldGeneratorExpression };

spec ParenthesizedExpression : Expression {
  inner : base;
}
export { ParenthesizedExpression };


// statements
spec BlockStatement : Statement {
  block : base;
}
export { BlockStatement };

spec BreakStatement : Statement {
  label : base;
}
export { BreakStatement };

spec ContinueStatement : Statement {
  label : base;
}
export { ContinueStatement };

spec CompoundAssignmentExpression : Statement {
  binding : base;
  operator : base;
  expression : base;
}
export { CompoundAssignmentExpression };

spec DebuggerStatement : Statement { }
spec DoWhileStatement : Statement {
  test : base;
  body : base;
}
export { DoWhileStatement };

spec EmptyStatement : Statement { }
spec ExpressionStatement : Statement {
  expression : Expression;
}
export { ExpressionStatement };

spec ForInStatement : Statement {
  left : base;
  right : base;
  body : base;
}
export { ForInStatement };

spec ForOfStatement : Statement {
  left : base;
  right : base;
  body : base;
}
export { ForOfStatement };

spec ForStatement : Statement {
  init : base;
  test : base;
  update : base;
  body : base;
}
export { ForStatement };

spec IfStatement : Statement {
  test : base;
  consequent : base;
  alternate : base;
}
export { IfStatement };

spec LabeledStatement : Statement {
  label : base;
  body : base;
}
export { LabeledStatement };

spec ReturnStatement : Statement {
  expression : base;
}
export { ReturnStatement };

spec SwitchStatement : Statement {
  discriminant : base;
  cases : base;
}
export { SwitchStatement };

spec SwitchStatementWithDefault : Statement {
  discriminant : base;
  preDefaultCases : base;
  defaultCase : base;
  postDefaultCases : base;
}
export { SwitchStatementWithDefault };

spec ThrowStatement : Statement {
  expression : base;
}
export { ThrowStatement };

spec TryCatchStatement : Statement {
  body : base;
  catchClause : base;
}
export { TryCatchStatement };

spec TryFinallyStatement : Statement {
  body : base;
  catchClause : base;
  finalizer : base;
}
export { TryFinallyStatement };

spec VariableDeclarationStatement : Statement {
  declaration : base;
}
export { VariableDeclarationStatement };

spec WithStatement : Statement {
  object : base;
  body : base;
}
export { WithStatement };

spec WhileStatement : Statement {
  test : base;
  body : base;
}
export { WhileStatement };


// other
spec Pragma : Term {
  kind : base;
  items : base;
}
export { Pragma };

spec Block : Term {
  statements : base;
}
export { Block };

spec CatchClause : Term {
  binding : base;
  body : base;
}
export { CatchClause };

spec Directive : Term {
  rawValue : base;
}
export { Directive };

spec FormalParameters : Term {
  items : base;
  rest : base;
}
export { FormalParameters };

spec FunctionBody : Term {
  directives : base;
  statements : base;
}
export { FunctionBody };

spec FunctionDeclaration : Statement {
  name : base;
  isGenerator : base;
  params : base;
  body : base;
}
export { FunctionDeclaration };

spec Script : Term {
  directives : base;
  statements : base;
}
export { Script };

spec SpreadElement : Term {
  expression : base;
}
export { SpreadElement };

spec Super : Term { }
spec SwitchCase : Term {
  test : base;
  consequent : base;
}
export { SwitchCase };

spec SwitchDefault : Term {
  consequent : base;
}
export { SwitchDefault };

spec TemplateElement : Term {
  rawValue : base;
}
export { TemplateElement };

spec SyntaxTemplate : Term {
  template : base;
}
export { SyntaxTemplate };

spec SyntaxQuote : Term {
  name : base;
  template : base;
}
export { SyntaxQuote };

spec VariableDeclaration : Term {
  kind : base;
  declarators : base;
}
export { VariableDeclaration };

spec VariableDeclarator : Term {
  binding : base;
  init : base;
}
export { VariableDeclarator };
