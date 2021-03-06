import { skipAllButComputedKey } from "@babel/helper-replace-supers";
export default function rewriteThis(programPath: NodePath) {
  // Rewrite "this" to be "undefined".
  programPath.traverse(rewriteThisVisitor);
}

/**
 * A visitor to walk the tree, rewriting all `this` references in the top-level scope to be
 * `undefined`.
 */
const rewriteThisVisitor = {
  ThisExpression(path) {
    path.replaceWith(path.scope.buildUndefinedNode());
  },
  Function(path) {
    if (path.isMethod()) skipAllButComputedKey(path);
    else if (!path.isArrowFunctionExpression()) path.skip();
  },
  ClassProperty(path) {
    skipAllButComputedKey(path);
  },
  ClassPrivateProperty(path) {
    path.skip();
  },
};
