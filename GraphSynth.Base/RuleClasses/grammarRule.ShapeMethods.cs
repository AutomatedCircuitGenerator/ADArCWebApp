/*************************************************************************
 *     This grammarRule.ShapeMethods.cs file partially defines the 
 *     grammarRule class (also partially defined in grammarRule.Basic.cs, 
 *     grammarRule.RecognizeApply.cs and grammarRule.NegativeRecognize.cs)
 *     and is part of the GraphSynth.BaseClasses Project which is the 
 *     foundation of the GraphSynth Application.
 *     GraphSynth.BaseClasses is protected and copyright under the MIT
 *     License.
 *     Copyright (c) 2011 Matthew Ira Campbell, PhD.
 *
 *     Permission is hereby granted, free of charge, to any person obtain-
 *     ing a copy of this software and associated documentation files 
 *     (the "Software"), to deal in the Software without restriction, incl-
 *     uding without limitation the rights to use, copy, modify, merge, 
 *     publish, distribute, sublicense, and/or sell copies of the Software, 
 *     and to permit persons to whom the Software is furnished to do so, 
 *     subject to the following conditions:
 *     
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 *     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 *     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGE-
 *     MENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 *     FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 *     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 *     WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *     
 *     Please find further details and contact information on GraphSynth
 *     at http://www.GraphSynth.com.
 *************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;

namespace GraphSynth.Representation {
    /* Here is the new overload of grammarRule that includes the ability to view
     * the graph as a 2-D shape where nodes are points or vertices, and arcs are
     * lines or edgesBySource. */

    public partial class grammarRule
    {
        #region Properties and Fields
        #region Regularization Matrix

        /// <summary>
        ///   this matrix determines the transform to place the first node at (0,0) and the 
        ///   second node at (r,0). This is not stored in the file since it can be quickly 
        ///   determined.
        /// </summary>
        private double[,] _regularizationMatrix;

        private double[,] RegularizationMatrix
        {
            get
            {
                if (_regularizationMatrix == null)
                    calculateRegularizationMatrix();
                return _regularizationMatrix;
            }
        }

        /// <summary>
        ///   Resets the regularization matrix.
        /// </summary>
        public void ResetRegularizationMatrix()
        {
            _regularizationMatrix = null;
        }

        /// <summary>
        ///   Calculates the regularization matrix.
        /// </summary>
        private void calculateRegularizationMatrix()
        {
            _regularizationMatrix = new double[3, 3];
            double a = 1.0, b = 0.0, c = 0.0, d = 1.0, tauX = 0.0, tauY = 0.0;
            double length = 1;


            if (L.nodes.Count >= 1)
            {
                tauX = -L.nodes[0].X;
                tauY = -L.nodes[0].Y;
            }
            if (L.nodes.Count >= 2)
            {
                var theta = -Math.Atan2((L.nodes[1].Y - L.nodes[0].Y), (L.nodes[1].X - L.nodes[0].X));
                if (MatrixMath.sameCloseZero(Math.Abs(theta), Math.PI / 2)) // theta is 90-degrees
                {
                    a = d = 0.0;
                    b = (theta > 0) ? -1 : 1;
                    c = -b;
                    length = Math.Abs(L.nodes[1].Y - L.nodes[0].Y);
                }
                else if (MatrixMath.sameCloseZero(theta))//theta is 0-degrees
                {
                    a = d = 1;
                    b = c = 0;
                    length = Math.Abs(L.nodes[1].X - L.nodes[0].X);
                }
                else
                {
                    a = d = Math.Cos(theta);
                    length = (L.nodes[1].X - L.nodes[0].X) / a;
                    b = -Math.Sin(theta);
                    c = -b;
                }
            }
            _regularizationMatrix[0, 0] = a / length;
            _regularizationMatrix[0, 1] = b / length;
            _regularizationMatrix[0, 2] = (a * tauX + b * tauY) / length;
            _regularizationMatrix[1, 0] = c / length;
            _regularizationMatrix[1, 1] = d / length;
            _regularizationMatrix[1, 2] = (c * tauX + d * tauY) / length;
            _regularizationMatrix[2, 0] = 0.0;
            _regularizationMatrix[2, 1] = 0.0;
            _regularizationMatrix[2, 2] = 1.0;
        }

        #endregion

        private transfromType _flip = transfromType.Prohibited;
        private transfromType _projection = transfromType.Prohibited;
        private Boolean _rotate = true;
        private transfromType _scale = transfromType.BothIndependent;
        private transfromType _skew = transfromType.Prohibited;
        private transfromType _translate = transfromType.BothIndependent;

        private Boolean _useShapeRestrictions;
        private Boolean _restrictToNodeShapeMatch;
        private Boolean _transformNodeShapes = true;
        private Boolean _transformNodePositions = true;

        /// <summary>
        ///   Gets or sets a value indicating whether [use shape restrictions].
        /// </summary>
        /// <value>
        ///   <c>true</c> if [use shape restrictions]; otherwise, <c>false</c>.
        /// </value>
        public Boolean UseShapeRestrictions
        {
            get { return _useShapeRestrictions; }
            set { _useShapeRestrictions = value; }
        }

        /// <summary>
        /// Gets or sets a value indicating whether [restrict to node shape match].
        /// </summary>
        /// <value>
        /// 	<c>true</c> if [restrict to node shape match]; otherwise, <c>false</c>.
        /// </value>
        public Boolean RestrictToNodeShapeMatch
        {
            get { return _restrictToNodeShapeMatch; }
            set { _restrictToNodeShapeMatch = value; }
        }

        /// <summary>
        /// Gets or sets a value indicating whether [transform node positions].
        /// </summary>
        /// <value><c>true</c> if [transform node positions]; otherwise, <c>false</c>.
        /// </value>
        public Boolean TransformNodePositions
        {
            get { return _transformNodePositions; }
            set { _transformNodePositions = value; }
        }

        /// <summary>
        /// Gets or sets a value indicating whether the node shapes are also transformed or simply their position.
        /// </summary>
        /// <value><c>true</c> if [transform node shapes]; otherwise, <c>false</c>.</value>
        public Boolean TransformNodeShapes
        {
            get { return _transformNodeShapes; }
            set { _transformNodeShapes = value; }
        }

        /// <summary>
        ///   Gets or sets the translate transformation allowance.
        /// </summary>
        /// <value>The translate.</value>
        public transfromType Translate
        {
            get { return _translate; }
            set { _translate = value; }
        }

        /// <summary>
        ///   Gets or sets the scale transformation allowance.
        /// </summary>
        /// <value>The scale.</value>
        public transfromType Scale
        {
            get { return _scale; }
            set { _scale = value; }
        }

        /// <summary>
        ///   Gets or sets the skew transformation allowance.
        /// </summary>
        /// <value>The skew.</value>
        public transfromType Skew
        {
            get { return _skew; }
            set { _skew = value; }
        }

        /// <summary>
        ///   Gets or sets the flip transformation allowance.
        /// </summary>
        /// <value>The flip.</value>
        public transfromType Flip
        {
            get { return _flip; }
            set { _flip = value; }
        }

        /// <summary>
        ///   Gets or sets a value indicating whether this <see cref = "grammarRule" /> allows a rotation transformation.
        /// </summary>
        /// <value><c>true</c> if rotate; otherwise, <c>false</c>.</value>
        public Boolean Rotate
        {
            get { return _rotate; }
            set { _rotate = value; }
        }

        /// <summary>
        ///   Gets or sets the projection transformation allowance.
        /// </summary>
        /// <value>The projection.</value>
        public transfromType Projection
        {
            get { return _projection; }
            set { _projection = value; }
        }

        #endregion

        #region Recognize Methods

        private double[,] findTransform(IList<node> locatedNodes)
        {
            /* if there are no nodes, simply return the identity matrix */
            if (locatedNodes.Count == 0) return MatrixMath.Identity(3);

            #region Variable Set-up

            /* Variable Set-up: This seems a little verbose, but it is necessary
             * to ease the calculations later and to avoid compile errors. */
            double x1, x2, x3, x4, y1, y2, y3, y4;
            x2 = x3 = x4 = y2 = y3 = y4 = 0;
            double tx, ty, wX, wY, a, b, c, d;
            tx = ty = wX = wY = a = b = c = d = 0;
            double k1, k2, k3, k4;
            k1 = k2 = k3 = k4 = 0;
            double u3, u4, v3, v4;
            u3 = u4 = v3 = v4 = 0;

            /* This x1 and y1 are matched with the position of L.nodes[0].X and .Y, 
             * which, given the Regularization concept, is effectively at 0,0. This is
             * what Regularization does. It's as if the first node in L is moved to zero
             * without loss of generality, and all the other nodes are translated accord-
             * ingly. So, u1 = v1 = 0. */
            x1 = locatedNodes[0].X;
            y1 = locatedNodes[0].Y;
            if (locatedNodes.Count >= 2)
            {
                x2 = locatedNodes[1].X;
                y2 = locatedNodes[1].Y;
                /* Given regularization, this second point is scaled and rotated to 1, 0. */
            }
            if (locatedNodes.Count >= 3)
            {
                x3 = locatedNodes[2].X;
                y3 = locatedNodes[2].Y;
                var temp = new[] { L.nodes[2].X, L.nodes[2].Y, 1.0 };
                temp = MatrixMath.multiply(RegularizationMatrix, temp, 3);
                u3 = temp[0];
                v3 = temp[1];
            }
            if (locatedNodes.Count >= 4)
            {
                x4 = locatedNodes[3].X;
                y4 = locatedNodes[3].Y;
                var temp = new[] { L.nodes[3].X, L.nodes[3].Y, 1.0 };
                temp = MatrixMath.multiply(RegularizationMatrix, temp, 3);
                u4 = temp[0];
                v4 = temp[1];
            }

            #endregion

            // set values for tx, and ty
            tx = x1;
            ty = y1;

            #region Calculate Projection Terms

            if ((locatedNodes.Count <= 3) || (MatrixMath.sameCloseZero(v3 * v4)))
                wX = wY = 0;
            else
            {
                //calculate intermediate values used only in this class or method
                //k1 = (u4 * (y4 - y2) / v4 - u3 * (y3 - y2) / v3);   //(Equation 3 of program)
                k1 = u4 * v3 * (y4 - y2) - u3 * v4 * (y3 - y2);
                if (MatrixMath.sameCloseZero(k1)) k1 = 0;
                else k1 /= v3 * v4;

                //k2 = (y3 - y2 * u3 + ty * u3 - ty) / v3 + (-y4 - ty * u4 + y2 * u4 + ty) / v4;  //(Equation 4 of program)
                k2 = v4 * (y3 - y2 * u3 + ty * u3 - ty) + v3 * (-y4 - ty * u4 + y2 * u4 + ty);
                if (MatrixMath.sameCloseZero(k2)) k2 = 0;
                else k2 /= v3 * v4;

                //k3 = (u3 * (x3 - x2) / v3 - u4 * (x4 - x2) / v4);
                k3 = u3 * v4 * (x3 - x2) - u4 * v3 * (x4 - x2);
                if (MatrixMath.sameCloseZero(k3)) k3 = 0;
                else k3 /= v3 * v4;

                //k4 = (x4 - x2 * u4 + tx * u4 - tx) / v4 - (x3 + tx * u3 - x2 * u3 - tx) / v3;
                k4 = v3 * (x4 - x2 * u4 + tx * u4 - tx) - v4 * (x3 + tx * u3 - x2 * u3 - tx);
                if (MatrixMath.sameCloseZero(k4)) k4 = 0;
                else k4 /= v3 * v4;

                //calculate wY, and wX
                wY = (k1 * k4) - (k2 * k3);
                if (MatrixMath.sameCloseZero(wY)) wY = 0;
                else wY /= k3 * (y3 - y4) + k1 * (x3 - x4); //(Equation 7 of program)

                wX = wY * (y3 - y4) + k2;
                if (MatrixMath.sameCloseZero(wX)) wX = 0;
                else wX /= k1; //is (Equation 8 of program) which is rewritten for program's accuracy
            }

            #endregion

            #region Calculate rotate, scale, skew terms

            if (locatedNodes.Count <= 1)
            {
                a = d = 1;
                b = c = 0;
            }
            else
            {
                // calculate a 
                a = x2 * (wX + 1) - tx;
                //calculate c
                c = y2 * (wX + 1) - ty;


                if ((locatedNodes.Count <= 2) || (LnodesAreCollinear()))
                {
                    /* in order for the validTransform to function, b and d are set as
                     * if there is a rotation as opposed to a Skew in X. It is likely that
                     * isotropic transformations like rotation are more often intended than skews. */
                    // var theta = Math.Atan2(-c, a);
                    b = -c;
                    d = a;
                }
                else
                {
                    //calculate b
                    b = x3 * (wX * u3 + wY * v3 + 1) - a * u3 - tx;
                    if (MatrixMath.sameCloseZero(b)) b = 0;
                    else b /= v3;
                    //calculate d
                    d = y3 * (wX * u3 + wY * v3 + 1) - c * u3 - ty;
                    if (MatrixMath.sameCloseZero(d)) d = 0;
                    else d /= v3;
                }
            }

            #endregion

            var T = new double[3, 3];
            T[0, 0] = a;
            T[0, 1] = b;
            T[0, 2] = tx;
            T[1, 0] = c;
            T[1, 1] = d;
            T[1, 2] = ty;
            T[2, 0] = wX;
            T[2, 1] = wY;
            T[2, 2] = 1;
            T = MatrixMath.multiply(T, RegularizationMatrix, 3);
            T[0, 0] /= T[2, 2];
            T[0, 1] /= T[2, 2];
            T[0, 2] /= T[2, 2];
            T[1, 0] /= T[2, 2];
            T[1, 1] /= T[2, 2];
            T[1, 2] /= T[2, 2];
            T[2, 0] /= T[2, 2];
            T[2, 1] /= T[2, 2];
            T[2, 2] = 1;
            snapToIntValues(T);
            //if (RestrictToNodeShapeMatch && T[0,0]==1 && T[)
            return T;
        }

        private static void snapToIntValues(double[,] T)
        {
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++)
                {
                    if (MatrixMath.sameCloseZero(T[i, j], 1)) T[i, j] = 1;
                    else if (MatrixMath.sameCloseZero(T[i, j])) T[i, j] = 0;
                    else if (MatrixMath.sameCloseZero(T[i, j], -1)) T[i, j] = -1;
                }
        }

        private Boolean LnodesAreCollinear()
        {
            var n1X = L.nodes[0].X;
            var n1Y = L.nodes[0].Y;
            var tNodes = new List<node>(L.nodes);
            tNodes.RemoveAt(0);
            if (tNodes.Count > 3) tNodes.RemoveRange(3, tNodes.Count - 3);
            int i1 = 0;
            foreach (var n1 in tNodes)
            {
               
               if (n1.Y != n1Y)
                   i1++;
               
            }
            if (i1 == 0)
                return true;
            i1 = 0;
            foreach (var n1 in tNodes)
            {

                if (n1.X != n1X)
                    i1++;

            }
            if (i1 == 0)
                return true;
          /*  if (tNodes.TrueForAll(n => n.Y == n1Y)) return true; */
          /*  if (tNodes.TrueForAll(n => n.X == n1X)) return true; */
            var m1 = (tNodes[0].Y - n1Y) / (tNodes[0].X - n1X);
            tNodes.RemoveAt(0);
            i1=0;
            foreach (var no in tNodes)
                if (m1 != (no.Y - n1Y) / (no.X - n1X))
                    i1++;
            if (i1 == 0)
                return true;
            else return false;
            //return tNodes.TrueForAll(n => (m1 == (n.Y - n1Y) / (n.X - n1X)));
        }

        private Boolean validTransform(double[,] T)
        {
            /* In this function the candidate transform, T, "runs the gauntlet. 
             * the long set of if statements each return false, and if T makes it all
             * the way through, we return true. */

            /* It's easy to check the translation and projection constraints first. Since there's
             * a one-to-one match with variables in the matrix and the flags. */
            /* if Tx is not zero... */
            if ((!MatrixMath.sameCloseZero(T[0, 2]))
                && ((Translate == transfromType.OnlyY) || (Translate == transfromType.Prohibited)))
                return false;
            if ((!MatrixMath.sameCloseZero(T[1, 2]))
                     && ((Translate == transfromType.OnlyX) || (Translate == transfromType.Prohibited)))
                return false;
            if ((!MatrixMath.sameCloseZero(T[0, 2], T[1, 2])) && (Translate == transfromType.BothUniform))
                return false;

            /* now for projection. */
            if ((!MatrixMath.sameCloseZero(T[2, 0]))
                && ((Projection == transfromType.OnlyY) || (Projection == transfromType.Prohibited)))
                return false;
            if ((!MatrixMath.sameCloseZero(T[2, 1]))
                     && ((Projection == transfromType.OnlyX) || (Projection == transfromType.Prohibited)))
                return false;
            if ((!MatrixMath.sameCloseZero(T[2, 0], T[2, 1])) && (Projection == transfromType.BothUniform))
                return false;

            /* Now, it's a little more complicated since the rotation occupies the same cells
         * in T as skewX, skewY, scaleX, and scaleY. The approach taken here is to solve 
         * for theta (the amount of rotation) and then call/return what the overload produces
         * which requires theta and solves for skewX, skewY, scaleX, and scaleY. */
            if (!Rotate) return validTransform(T, 0.0);
            /* Skew restrictions are easier than Scale, because they default to (as in the 
         * identity matrix) 0 whereas Scale is 1. */
            if ((Skew == transfromType.Prohibited) || (Skew == transfromType.OnlyY))
                return validTransform(T, Math.Atan2(T[0, 1], T[1, 1]));
            if (Skew == transfromType.OnlyX)
                return validTransform(T, Math.Atan2(-T[1, 0], T[0, 0]));
            if (Skew == transfromType.BothUniform)
                return validTransform(T, Math.Atan2((T[0, 1] - T[1, 0]), (T[0, 0] + T[1, 1])));

            /* Lastly, and most challenging, we look at Scale Restrictions. Flip is basically
         * the same and handled in the overload below. */
            if ((Scale == transfromType.Prohibited) || (Scale == transfromType.OnlyY))
            {
                var Too2PlusTio2 = T[0, 0] * T[0, 0] + T[1, 0] * T[1, 0];
                var sqrtt2pt2 = Math.Sqrt(Too2PlusTio2);
                var Ky = Math.Sqrt(Too2PlusTio2 - 1);
                return validTransform(T, Math.Acos(T[0, 0] / sqrtt2pt2) +
                                         Math.Atan2(Ky, 1));
            }
            if (Scale == transfromType.OnlyY)
            {
                var Toi2PlusTii2 = T[0, 1] * T[0, 1] + T[1, 1] * T[1, 1];
                var sqrtt2pt2 = Math.Sqrt(Toi2PlusTii2);
                var Kx = Math.Sqrt(Toi2PlusTii2 - 1);
                return validTransform(T, Math.Acos(T[0, 1] / sqrtt2pt2) +
                                         Math.Atan2(1, Kx));
            }
            if (_scale == transfromType.BothUniform)
                return validTransform(T, Math.Atan2((T[0, 0] - T[1, 1]), (T[0, 1] + T[1, 0])));
            return true;
        }

        private Boolean validTransform(double[,] T, double theta)
        {
            /* now with theta known, we can find the values for Sx, Sy, Kx, and Ky. */
            var Kx = T[0, 1] * Math.Cos(theta) - T[1, 1] * Math.Sin(theta);
            var Ky = T[0, 0] * Math.Sin(theta) + T[1, 0] * Math.Cos(theta);
            var Sx = T[0, 0] * Math.Cos(theta) - T[1, 0] * Math.Sin(theta);
            var Sy = T[0, 1] * Math.Sin(theta) + T[1, 1] * Math.Cos(theta);

            /* now check the skew restrictions, once an error is found return false. */
            if ((!MatrixMath.sameCloseZero(Kx)) &&
                ((Skew == transfromType.Prohibited) || (Skew == transfromType.OnlyY)))
                return false;
            if ((!MatrixMath.sameCloseZero(Ky)) &&
                     ((Skew == transfromType.Prohibited) || (Skew == transfromType.OnlyY)))
                return false;
            if ((!MatrixMath.sameCloseZero(Kx, Ky)) && (Skew == transfromType.BothUniform))
                return false;

            /* now we check scaling restrictions. */
            if ((!MatrixMath.sameCloseZero(Math.Abs(Sx), 1)) &&
                     ((Scale == transfromType.Prohibited) || (Scale == transfromType.OnlyY)))
                return false;
            if ((!MatrixMath.sameCloseZero(Math.Abs(Sy), 1)) &&
                     ((Scale == transfromType.Prohibited) || (Scale == transfromType.OnlyX)))
                return false;
            if ((!MatrixMath.sameCloseZero(Math.Abs(Sx), Math.Abs(Sy))) && (Scale == transfromType.BothUniform))
                return false;

            /* finally, we check if the shape has to be flipped. */
            if ((Sx < 0) &&
                ((Flip == transfromType.Prohibited) || (Flip == transfromType.OnlyY)))
                return false;
            if ((Sy < 0) &&
                ((Flip == transfromType.Prohibited) || (Flip == transfromType.OnlyX)))
                return false;
            if ((Sx * Sy < 0) && (Flip == transfromType.BothUniform))
                return false;
            return true;
        }

        private Boolean otherNodesComply(double[,] T, IList<node> locatedNodes)
        {
            if (locatedNodes.Count <= 2) return true;
            for (var i = 2; i != locatedNodes.Count; i++)
            {
                var vLVect = new[] { L.nodes[i].X, L.nodes[i].Y, 1.0 };
                vLVect = MatrixMath.multiply(T, vLVect, 3);
                vLVect[0] /= vLVect[2];
                vLVect[1] /= vLVect[2];
                var vHostVect = new[] { locatedNodes[i].X, locatedNodes[i].Y, 1.0 };
                if ((!MatrixMath.sameCloseZero(vLVect[0], vHostVect[0]))
                    || (!MatrixMath.sameCloseZero(vLVect[1], vHostVect[1])))
                    return false;
            }
            return true;
        }

        /// <summary>
        /// Reorders the nodes for best shape transform. This is to put all NOT-exist nodes
        /// at the end of the list and to avoid unlikely problems when first 3 or 4 nodes 
        /// are collinear or sitting on top of each other.
        /// </summary>
        public void ReorderNodes()
        {
            /* put not-exist nodes at the end of the list. */
            List<node> notExistNodes = new List<node>();
            foreach (node n in L.nodes)
            {
                if (((ruleNode)n).NotExist)
                    notExistNodes.Add(n);
                    

            }
           // var notExistNodes = L.nodes.FirstAll(n => ((ruleNode)n).NotExist);
            L.nodes.RemoveAll(notExistNodes.Contains);

            /* if all the nodes are collinear, there's nothing we can do. */
            if ((L.nodes.Count < 3) || (LnodesAreCollinear()))
            {
                L.nodes.AddRange(notExistNodes);
                return;
            }
            /*take off the node with the lowest x, call it nodeMinX */
            var minX = L.nodes.Min(n => n.X);
            var nodeMinX = L.nodes.FirstOrDefault(n => n.X == minX);
            L.nodes.Remove(nodeMinX);
            /*take off the node with the largest x, call it nodeMaxX */
            var maxX = L.nodes.Max(n => n.X);
            var nodeMaxX = L.nodes.FirstOrDefault(n => n.X == maxX);
            L.nodes.Remove(nodeMaxX);
            /*take off the node with the next lowest x, call it nodeMinXX */
            var minXX = L.nodes.Min(n => n.X);
            var nodeMinXX = L.nodes.FirstOrDefault(n => n.X == minXX);
            L.nodes.Remove(nodeMinXX);
            if (L.nodes.Count > 0)
            {
                /* if you have four or more nodes, find a fourth point, 
                 * again at max X. */
                var maxXX = L.nodes.Max(n => n.X);
                var nodeMaxXX = L.nodes.FirstOrDefault(n => n.X == maxXX);
                L.nodes.Remove(nodeMaxXX);
                L.nodes.Insert(0, nodeMaxXX);
            }
            L.nodes.Insert(0, nodeMinXX);
            L.nodes.Insert(0, nodeMaxX);
            L.nodes.Insert(0, nodeMinX);
            L.nodes.AddRange(notExistNodes);
        }
        #endregion

        #region Apply Method

        /// <summary>
        ///   Updates the position of a node.
        /// </summary>
        /// <param name = "update">The node to update.</param>
        /// <param name = "T">The Transformation matrix, T.</param>
        /// <param name = "given">The given rule node.</param>
        private static void TransformPositionOfNode(node update, double[,] T, node given)
        {
            var pt = new[] { given.X, given.Y, 1 };
            pt = MatrixMath.multiply(T, pt, 3);
            var newT = MatrixMath.Identity(3);
            newT[0, 2] = update.X = pt[0] / pt[2];
            newT[1, 2] = update.Y = pt[1] / pt[2];

            if (update.DisplayShape != null)
                update.DisplayShape.TransformMatrix = newT;
        }


        /// <summary>
        /// Transfroms the shape of node.
        /// </summary>
        /// <param name="update">The update.</param>
        /// <param name="T">The T.</param>
        private static void TransfromShapeOfNode(node update, double[,] T)
        {
            var newT = (double[,])T.Clone();
            newT[0, 2] = update.X;
            newT[1, 2] = update.Y;
            if (update.DisplayShape != null)
                update.DisplayShape.TransformMatrix = newT;
        }

        #endregion
    }
}