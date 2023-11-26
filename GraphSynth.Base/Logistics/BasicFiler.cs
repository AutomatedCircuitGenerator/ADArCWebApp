/*************************************************************************
 *     This BasicFiler file & interface is part of the GraphSynth.BaseClasses 
 *     Project which is the foundation of the GraphSynth Application.
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
#region
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using GraphSynth.Representation;
#endregion

namespace GraphSynth {
    /// <summary>
    ///   This method saves and opens basic graphs and rules (doesn't include WPF shapes)
    ///   as well as rulesets, which are the same as in earlier versions of GraphSynth.
    /// </summary>
    public class BasicFiler {
        /// <summary>
        ///   Initializes a new instance of the <see cref = "BasicFiler" /> class.
        /// </summary>
        /// <param name = "iDir">The input directory.</param>
        /// <param name = "oDir">The output directory.</param>
        /// <param name = "rDir">The rules directory.</param>
        public BasicFiler(string iDir, string oDir, string rDir) {
            inputDirectory = iDir;
            outputDirectory = oDir;
            rulesDirectory = rDir;
        }

        #region Directory Properties

        /// <summary>
        ///   This constant is used to tell other XML parsers (namely XAML displayers)
        ///   to ignore elements that are prefaced with this.
        /// </summary>
        protected const string IgnorablePrefix = "GraphSynth:";

        /// <summary>
        ///   Gets or sets the input directory.
        /// </summary>
        /// <value>The input directory.</value>
        public string inputDirectory {
            get; set;
        }

        /// <summary>
        ///   Gets or sets the output directory.
        /// </summary>
        /// <value>The output directory.</value>
        public string outputDirectory {
            get; set;
        }

        /// <summary>
        ///   Gets or sets the rules directory.
        /// </summary>
        /// <value>The rules directory.</value>
        public string rulesDirectory {
            get; set;
        }

        #endregion


        /// <summary>
        ///   Saves the object, o, to the specified filename.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <param name = "o">The object to save.</param>
        /// <param name = "SuppressWarnings">if set to <c>true</c> [suppress warnings].</param>


        /// <summary>
        ///   Opens the list of objects at the specified filename.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <param name = "SuppressWarnings">if set to <c>true</c> [suppresses warnings].</param>
        /// <returns>an array of opened objects</returns>

        #region Save & Open designGraph

        /// <summary>
        ///   Saves the graph.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <param name = "graph1">The graph1.</param>

        ///   Serializes the graph to XML.
        /// </summary>
        /// <param name = "graph1">The graph1.</param>
        /// <returns></returns>
        protected string SerializeGraphToXml(designGraph graph1) {
            try {
                var settings = new XmlWriterSettings {
                    Indent = true,
                    NewLineOnAttributes = true,
                    CloseOutput = true,
                    OmitXmlDeclaration = true
                };
                var saveString = new StringBuilder();
                var saveXML = XmlWriter.Create(saveString, settings);
                var graphSerializer = new XmlSerializer(typeof(designGraph));
                graphSerializer.Serialize(saveXML, graph1);
                return saveString.ToString();
            } catch (Exception ioe) {
                // SearchIO.output("***XML Serialization Error***");
                // SearchIO.output(ioe.ToString());
                return null;
            }
        }

        /// <summary>
        ///   Opens the graph.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <returns></returns>

        /// <summary>
        ///   Deserialize graph from XML.
        /// </summary>
        /// <param name = "xmlString">The XML string.</param>
        /// <returns></returns>
        protected designGraph DeSerializeGraphFromXML(string xmlString) {
            try {
                var stringReader = new StringReader(xmlString);
                var graphDeserializer = new XmlSerializer(typeof(designGraph));
                var newDesignGraph = (designGraph) graphDeserializer.Deserialize(stringReader);
                newDesignGraph.internallyConnectGraph();
                removeNullWhiteSpaceEmptyLabels(newDesignGraph);
                return newDesignGraph;
            } catch (Exception ioe) {
                //   SearchIO.output("***Error Opening Graph:*** ");
                //   SearchIO.output(ioe.ToString());
                return null;
            }
        }

        /// <summary>
        /// Removes the null white space empty labels.
        /// </summary>
        /// <param name="g">The g.</param>
        protected static void removeNullWhiteSpaceEmptyLabels(designGraph g) {
            g.globalLabels.RemoveAll(string.IsNullOrWhiteSpace);
            foreach (var a in g.arcs)
                a.localLabels.RemoveAll(string.IsNullOrWhiteSpace);
            foreach (var a in g.nodes)
                a.localLabels.RemoveAll(string.IsNullOrWhiteSpace);
            foreach (var a in g.hyperarcs)
                a.localLabels.RemoveAll(string.IsNullOrWhiteSpace);
        }

        /// <summary>
        ///   Restores the display shapes.
        /// </summary>
        /// <param name = "graph">The graph.</param>
        private static void RestoreDisplayShapes(designGraph graph) {
            //   var oldX = 0.0;
            //   var oldY = 0.0;
            //    var oldZ = 0.0;
            //    var minY = double.PositiveInfinity;
            //    var shapeKey = "";


        }

        #endregion

        #region Save & Open grammarRule

        /// <summary>
        ///   Saves the rule.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <param name = "ruleToSave">The rule to save.</param>

        /// <summary>
        ///   Serializes the rule to XML.
        /// </summary>
        /// <param name = "ruleToSave">The rule to save.</param>
        /// <returns></returns>
        protected string SerializeRuleToXml(grammarRule ruleToSave) {
            try {
                var settings = new XmlWriterSettings {
                    Indent = true,
                    NewLineOnAttributes = true,
                    CloseOutput = true,
                    OmitXmlDeclaration = true
                };
                var saveString = new StringBuilder();
                var saveXML = XmlWriter.Create(saveString, settings);
                var ruleSerializer = new XmlSerializer(typeof(grammarRule));
                ruleSerializer.Serialize(saveXML, ruleToSave);
                return saveString.ToString();
            } catch (Exception ioe) {
                // SearchIO.output("***XML Serialization Error***");
                //  SearchIO.output(ioe.ToString());
                return null;
            }
        }

        /// <summary>
        ///   Opens the rule.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <returns></returns>

        /// <summary>
        ///   Deserialize rule from XML.
        /// </summary>
        /// <param name = "xmlString">The XML string.</param>
        /// <returns></returns>
        protected grammarRule DeSerializeRuleFromXML(string xmlString) {
            try {
                var stringReader = new StringReader(xmlString);
                var ruleDeserializer = new XmlSerializer(typeof(grammarRule));
                var newGrammarRule = (grammarRule) ruleDeserializer.Deserialize(stringReader);
                if (newGrammarRule.L == null)
                    newGrammarRule.L = new designGraph();
                else
                    newGrammarRule.L.internallyConnectGraph();

                if (newGrammarRule.R == null)
                    newGrammarRule.R = new designGraph();
                else
                    newGrammarRule.R.internallyConnectGraph();

                foreach (var er in newGrammarRule.embeddingRules.Where(er => er.oldLabels != null)) {

                    er.oldLabels = null;
                }
                return newGrammarRule;
            } catch (Exception ioe) {
                // SearchIO.output("***Error Opening Graph:*** ");
                //  SearchIO.output(ioe.ToString());
                return null;
            }
        }


        #endregion

        #region Save & Open ruleSet

        /// <summary>
        ///   Saves the rule set.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <param name = "ruleSetToSave">The rule set to save.</param>

        /// <summary>
        ///   Opens the rule set.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <returns></returns>

        /// <summary>
        ///   Loads the rules from file names.
        /// </summary>
        /// <param name = "ruleDir">The rule dir.</param>
        /// <param name = "ruleFileNames">The rule file names.</param>
        /// <param name = "numLoaded">The num loaded.</param>
        /// <returns></returns>


        #endregion

        #region Save & Open candidate

        /// <summary>
        /// Saves the candidate.
        /// </summary>
        /// <param name="filename">The filename.</param>
        /// <param name="candidates">The candidates.</param>
        /// <param name="SaveToOutputDir">if set to <c>true</c> [save to output dir].</param>
        /// <param name="timeStamp">if set to <c>true</c> [time stamp].</param>

        /// <summary>
        ///   Saves the candidate.
        /// </summary>
        /// <param name = "filename">The filename.</param>
        /// <param name = "c1">The c1.</param>


        #endregion
    }
}