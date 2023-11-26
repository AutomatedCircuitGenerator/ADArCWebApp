/*************************************************************************
 *     This ruleSet.File.cs file partially defines the ruleset class (also
 *     partially defined in ruleSet.Basic.cs) and is part of the 
 *     GraphSynth.BaseClasses Project which is the foundation of the 
 *     GraphSynth Application.
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
using Microsoft.CSharp;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml.Serialization;

namespace GraphSynth.Representation {
    /// <summary>
    ///   The ruleset class represents one of the three main file types of GraphSynth. A ruleset is saved as a .rsxml. It represents a
    ///   language of rules that operate in concert. The included rules are all loaded at once, and used to populate a list of
    ///   options which make changes to a host.
    /// </summary>
    public partial class ruleSet
    {
        #region Fields

        private Boolean FileChangedBypass;
        //private FileSystemWatcher watch;

        /// <summary>
        ///   Gets or sets the filer.
        /// </summary>
        /// <value>The filer.</value>
        [XmlIgnore]
        public BasicFiler filer { get; set; }

        /// <summary>
        ///   Gets or sets the rules dir.
        /// </summary>
        /// <value>The rules dir.</value>
        [XmlIgnore]
        public string rulesDir { get; set; }

        /// <summary>
        ///   Gets or sets the generation method after normal.
        /// </summary>
        /// <value>The generation after normal.</value>
        public nextGenerationSteps generationAfterNormal
        {
            get { return nextGenerationStep[0]; }
            set { nextGenerationStep[0] = value; }
        }

        /// <summary>
        ///   Gets or sets the generation method after choice.
        /// </summary>
        /// <value>The generation after choice.</value>
        public nextGenerationSteps generationAfterChoice
        {
            get { return nextGenerationStep[1]; }
            set { nextGenerationStep[1] = value; }
        }

        /// <summary>
        ///   Gets or sets the generation method after cycle limit.
        /// </summary>
        /// <value>The generation after cycle limit.</value>
        public nextGenerationSteps generationAfterCycleLimit
        {
            get { return nextGenerationStep[2]; }
            set { nextGenerationStep[2] = value; }
        }

        /// <summary>
        ///   Gets or sets the generation method after no rules.
        /// </summary>
        /// <value>The generation after no rules.</value>
        public nextGenerationSteps generationAfterNoRules
        {
            get { return nextGenerationStep[3]; }
            set { nextGenerationStep[3] = value; }
        }

        /// <summary>
        ///   Gets or sets the generation method after trigger rule.
        /// </summary>
        /// <value>The generation after trigger rule.</value>
        public nextGenerationSteps generationAfterTriggerRule
        {
            get { return nextGenerationStep[4]; }
            set { nextGenerationStep[4] = value; }
        }

        #endregion

        #region Load and compile Source Files

        /// <summary>
        ///   Loads and compiles the source files.
        /// </summary>
        /// <param name = "rulesets">The rulesets.</param>
        /// <param name = "recompileRules">if set to <c>true</c> [recompile rules].</param>
        /// <param name = "compiledparamRules">The compiledparam rules.</param>
        /// <param name = "execDir">The exec dir.</param>
     
        /// <summary>
        ///   Finds the source files.
        /// </summary>
        /// <param name = "rulesets">The rulesets.</param>
        /// <param name = "allSourceFiles">All source files.</param>
        /// <param name = "rulesDirectory">The rules directory.</param>
        /// <returns></returns>
       
        /// <summary>
        ///   Compiles the source files.
        /// </summary>
        /// <param name = "rulesets">The rulesets.</param>
        /// <param name = "allSourceFiles">All source files.</param>
        /// <param name = "cr">The cr.</param>
        /// <param name = "rulesDir">The rules dir.</param>
        /// <param name = "execDir">The exec dir.</param>
        /// <param name = "compiledparamRules">The compiledparam rules.</param>
        /// <returns></returns>
       
        private static Boolean compiledFunctionsAlreadyLoaded(IEnumerable<ruleSet> rulesets)
        {
            return rulesets
                .Where(set => set != null)
                .All(set =>
                    !(set.rules.Any(rule => rule.recognizeFuncs.Count + rule.applyFuncs.Count
                        != rule.recognizeFunctions.Count + rule.applyFunctions.Count)));
        }

        #endregion

   
    }
}