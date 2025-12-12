import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Hammer,
  Droplet,
  BrickWall,
  Grid3X3,
  Zap,
  HardHat,
  ChevronRight,
  Search,
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Menu,
  X,
  Phone,
  Lock,
  Edit,
  Plus,
  Trash2,
  Save,
  Settings,
  RefreshCw,
  Eye,
  RotateCcw,
  ArrowRight,
  Play,
  Waves,
  Wrench,
  ShieldCheck,
  Maximize2,
  ExternalLink,
  Youtube,
  Video,
  List,
  Image as ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  Send,
  Bot,
  Sparkles,
  User,
  Cpu,
  Camera,
  LogIn,
} from 'lucide-react';

// --- AI Agent Configuration ---
const AGENT_PERSONAS = {
  plumbing: {
    name: 'Master Plumber AI',
    role: 'Senior Project Manager / IPC Expert',
    greeting:
      "I'm ready. Ask me about the manual, specific IPC codes, or general plumbing theory.",
    color: 'bg-blue-600',
    avatarBg: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  electrical: {
    name: 'Senior Sparky AI',
    role: 'Master Electrician / NEC Code Expert',
    greeting:
      "I'm online. I can help with this specific manual, load calcs, or general electrical theory.",
    color: 'bg-yellow-600',
    avatarBg: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  carpentry: {
    name: 'Lead Carpenter AI',
    role: 'Master Framer & Finish Specialist',
    greeting:
      'Ready to build. Ask me about the prints, framing geometry, or general woodworking tips.',
    color: 'bg-amber-600',
    avatarBg: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  tile: {
    name: 'Stone Mason AI',
    role: 'TCNA Handbook Expert',
    greeting:
      "Let's set some tile. Ask about the manual, thin-set types, or layout math.",
    color: 'bg-emerald-600',
    avatarBg: 'bg-emerald-100',
    textColor: 'text-emerald-700',
  },
  default: {
    name: 'Site Super AI',
    role: 'General Construction Manager',
    greeting:
      'I have access to all manuals and general construction knowledge. How can I help?',
    color: 'bg-slate-800',
    avatarBg: 'bg-slate-100',
    textColor: 'text-slate-700',
  },
};

// --- Blueprint Diagram Component ---
const BlueprintDiagram = ({ type, customUrl }) => {
  if (!type) return null;

  const renderContent = () => {
    switch (type) {
      case 'custom':
        if (!customUrl)
          return (
            <div className="text-blue-300 text-xs text-center p-4">
              No custom blueprint URL provided.
            </div>
          );
        return (
          <img
            src={customUrl}
            alt="Custom Blueprint"
            className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/400x200?text=Blueprint+Load+Error';
            }}
          />
        );
      case 'layout':
        return (
          <svg
            viewBox="0 0 400 200"
            className="w-full h-full text-blue-100"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            <path d="M 20 100 L 380 100" strokeDasharray="5,5" opacity="0.5" />
            <text
              x="200"
              y="30"
              fill="currentColor"
              fontSize="12"
              textAnchor="middle"
              stroke="none"
            >
              SYSTEM FLOW ORDER
            </text>
            <rect x="50" y="60" width="40" height="80" rx="4" />
            <text
              x="70"
              y="155"
              fill="currentColor"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
            >
              Filter
            </text>
            <text
              x="70"
              y="90"
              fill="currentColor"
              fontSize="8"
              textAnchor="middle"
              stroke="none"
            >
              5mic
            </text>
            <rect x="150" y="50" width="60" height="100" rx="8" />
            <text
              x="180"
              y="165"
              fill="currentColor"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
            >
              Iron (Air)
            </text>
            <rect x="270" y="50" width="60" height="100" rx="8" />
            <text
              x="300"
              y="165"
              fill="currentColor"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
            >
              Softener
            </text>
            <path d="M 90 100 L 150 100" />
            <path d="M 210 100 L 270 100" />
            <path d="M 330 100 L 380 100" markerEnd="url(#arrow)" />
          </svg>
        );
      case 'bypass':
        return (
          <svg
            viewBox="0 0 400 220"
            className="w-full h-full text-blue-100"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            <text
              x="200"
              y="30"
              fill="currentColor"
              fontSize="12"
              textAnchor="middle"
              stroke="none"
            >
              3-VALVE BYPASS SCHEMATIC
            </text>
            <path d="M 40 180 L 360 180" strokeWidth="3" />
            <text
              x="200"
              y="200"
              fill="currentColor"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
            >
              Bypass Valve (Normally CLOSED)
            </text>
            <path d="M 100 180 L 100 80" strokeWidth="3" />
            <path d="M 300 180 L 300 80" strokeWidth="3" />
            <circle cx="200" cy="180" r="10" fill="#0C1A2A" />
            <path d="M 193 173 L 207 187" stroke="white" strokeWidth="2" />
            <path d="M 207 173 L 193 187" stroke="white" strokeWidth="2" />
            <circle cx="100" cy="130" r="10" fill="#0C1A2A" />
            <path d="M 100 122 L 100 138" stroke="white" strokeWidth="2" />
            <circle cx="300" cy="130" r="10" fill="#0C1A2A" />
            <path d="M 300 122 L 300 138" stroke="white" strokeWidth="2" />
            <rect
              x="130"
              y="40"
              width="140"
              height="60"
              rx="4"
              strokeDasharray="4,4"
            />
            <text
              x="200"
              y="75"
              fill="currentColor"
              fontSize="14"
              textAnchor="middle"
              stroke="none"
            >
              TREATMENT UNIT
            </text>
          </svg>
        );
      case 'airgap':
        return (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-blue-100"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            <text
              x="100"
              y="20"
              fill="currentColor"
              fontSize="12"
              textAnchor="middle"
              stroke="none"
            >
              AIR GAP DETAIL
            </text>
            <path d="M 100 40 L 100 120" strokeWidth="6" />
            <line x1="80" y1="120" x2="120" y2="120" />
            <path
              d="M 130 120 L 130 160"
              stroke="#FFC947"
              markerStart="url(#tick)"
              markerEnd="url(#tick)"
            />
            <text x="145" y="145" fill="#FFC947" fontSize="10" stroke="none">
              2" MIN
            </text>
            <ellipse
              cx="100"
              cy="170"
              rx="30"
              ry="10"
              fill="rgba(255,255,255,0.1)"
            />
            <path d="M 70 170 L 70 190 L 130 190 L 130 170" />
            <text
              x="100"
              y="195"
              fill="currentColor"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
            >
              Floor Drain
            </text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#0F2640] rounded-lg overflow-hidden border border-slate-600 shadow-inner mt-4 mb-2">
      <div className="bg-[#08121f] px-3 py-1 flex justify-between items-center border-b border-slate-700">
        <span className="text-[10px] font-mono text-blue-300 tracking-widest uppercase">
          LC-STD-DWG-{type.toUpperCase()}
        </span>
        <Maximize2 size={12} className="text-slate-500" />
      </div>
      <div className="p-4 h-48 flex items-center justify-center relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>
        {renderContent()}
      </div>
    </div>
  );
};

// --- Initial Mock Data ---
const INITIAL_DATA = {
  plumbing: {
    title: 'Plumbing',
    iconName: 'Droplet',
    color: 'bg-blue-100 text-blue-600',
    manuals: [
      {
        id: 'p-01',
        title: 'Rough-In Standards & Tolerances',
        description:
          'Critical measurements and pipe securing protocols for rough-ins.',
        lastUpdated: 'Oct 12, 2023',
        content: {
          overview:
            'All rough-in plumbing must strictly adhere to local code and LC Custom internal tolerances to ensure seamless finish work.',
          steps: [
            'Ensure all stub-outs are capped and pressure tested to 60 PSI for water lines.',
            'Drain lines must maintain a 1/4 inch per foot slope minimum.',
            'Shower valves must be centered exactly on the framing blocking; do not rely on pipe rigidity alone.',
            'Protect all exposed pipes with nail plates where passing through studs.',
          ],
          checklist: [
            'Pressure test gauge visible',
            'Nail plates installed',
            'Stub-outs capped',
            'Lines insulated (if exterior wall)',
          ],
          critical:
            'Do not bury any PEX fittings behind drywall without photographic evidence and site supervisor approval.',
        },
      },
      {
        id: 'p-02',
        title: 'PVC Glue & Primer Procedure',
        description:
          'Correct application of purple primer and cement to prevent leaks.',
        lastUpdated: 'Sep 05, 2023',
        content: {
          overview:
            'Failures in PVC joints are almost always due to improper priming or setting time.',
          steps: [
            'Cut pipe square and deburr edges.',
            'Apply purple primer to the fitting socket first, then the pipe, then the socket again.',
            'Apply cement while primer is still wet.',
            'Push pipe into fitting with a quarter turn and hold for 30 seconds.',
          ],
          checklist: [
            'Pipe deburred',
            'Purple primer visible',
            'Quarter turn performed',
            'Held for 30s',
          ],
          critical:
            'Any joint lacking visible purple primer will be rejected immediately.',
        },
      },
      {
        id: 'p-03',
        title: 'Well Water Install (Option A)',
        description:
          'Complete installation guide for Well Water systems including pre-flight checks.',
        lastUpdated: 'Dec 11, 2025',
        content: {
          overview:
            'Installation protocol for standard Option A well water treatment. Follow component order strictly: Pressure Tank -> Sediment -> Iron (Air) -> Softener.',
          resources: [
            { type: 'video', title: 'Installation Walkthrough', url: '#' },
            { type: 'pdf', title: 'Valve Programming Guide (PDF)', url: '#' },
            { type: 'pdf', title: 'Iron Filter Spec Sheet', url: '#' },
          ],
          preflight: [
            {
              title: 'REQUIRED EQUIPMENT',
              items: [
                { text: 'Tank 1: Iron Filter (ISF-150-AD)', url: '#' },
                { text: 'Tank 2: Water Softener (48k Grain)', url: '#' },
                { text: 'Housing: 20" Big Blue Filter', url: '#' },
                { text: 'Cartridge: 5 Micron Spun Poly' },
              ],
            },
            {
              title: 'CRITICAL FITTINGS',
              items: [
                { text: '#4 Bare Copper Bonding Wire', tag: 'NEC 250.104' },
                { text: 'Air Gap Fittings (x2)', tag: 'CODE REQ', url: '#' },
                { text: '1" Full Port Ball Valves (x6)', tag: 'QTY CHECK' },
              ],
            },
          ],
          steps: [
            {
              text: 'Isolate main water supply. Depressurize system via lowest fixture (hose bib or laundry tub) before cutting into the main loop.',
              image:
                'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
            },
            {
              text: 'Establish System Layout. Install 20" Sediment Filter immediately downstream of pressure tank. Position Iron Filter (Tank 1) then Softener (Tank 2). Maintain 4" min clearance from walls.',
              diagram: 'layout',
              exampleImage:
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2732&auto=format&fit=crop',
            },
            {
              text: 'Construct 3-Valve Bypass loops for BOTH treatment tanks using 1" Copper or PEX-A. Ensure directional flow arrows on control heads match supply direction.',
              diagram: 'bypass',
            },
            {
              text: 'Bridge treatment loop with #4 bare copper bonding jumper. Use approved ground clamps. Continuity must be maintained across all filters/softeners per NEC 250.104.',
            },
            {
              text: 'Route backwash drain lines to floor drain. Install rigid Air Gap fittings. Do not insert drain lines directly into sewer standpipes (cross-connection hazard).',
              diagram: 'airgap',
            },
            {
              text: 'Startup: Place units in bypass. Flush main line. Open inlet slowly. Initiate manual regeneration on Iron Filter first to purge air. Check for leaks.',
            },
          ],
          checklist: [
            'System Order: Sediment -> Iron -> Softener',
            'Bonding Jumper installed & tight',
            'Air Gap visible on drain lines',
            'Tanks plumb & level',
            'No leaks @ 60 PSI',
          ],
          critical:
            'Bonding Jumper Wire and Air Gap Fittings are CODE REQUIREMENTS. Failure to install these will result in immediate inspection failure and non-payment.',
        },
      },
    ],
  },
  waterproofing: {
    title: 'Waterproofing',
    iconName: 'Waves',
    color: 'bg-cyan-100 text-cyan-600',
    manuals: [
      {
        id: 'w-01',
        title: 'Foundation Wall Waterproofing',
        description: 'Application of fluid membrane and drainage board.',
        lastUpdated: 'Mar 10, 2024',
        content: {
          overview:
            'Waterproofing the foundation is the first line of defense against basement moisture. This process must be continuous and defect-free.',
          steps: [
            'Clean the concrete wall thoroughly. Remove all dirt, loose debris, and form ties.',
            'Patch all tie holes and honeycombs with hydraulic cement.',
            'Apply primer to the wall and footing keyway if required by manufacturer.',
            'Apply the fluid-applied waterproofing membrane to the specified mil thickness (usually 60 mils wet).',
            'Install drainage board (dimple side in) while membrane is tacky, or using adhesive.',
            'Install termination bar at grade level to seal the top edge.',
          ],
          checklist: [
            'Wall cleaned & dry',
            'Tie holes patched',
            'Mils thickness verified (gauge)',
            'Drainage board secure',
            'Termination bar installed',
          ],
          critical:
            'Do not backfill until the membrane has fully cured (24 hours minimum) and has been inspected.',
        },
      },
    ],
  },
  tile: {
    title: 'Tile & Stone',
    iconName: 'Grid3X3',
    color: 'bg-emerald-100 text-emerald-600',
    manuals: [
      {
        id: 't-01',
        title: 'Substrate Preparation (Wet Areas)',
        description: 'Waterproofing and board standards for showers and baths.',
        lastUpdated: 'Nov 20, 2023',
        content: {
          overview:
            'A perfect tile job fails without a perfect substrate. We do not skip waterproofing steps.',
          steps: [
            'Ensure cement board is fastened every 8 inches on edges and 12 inches in field.',
            'Tape all seams with alkali-resistant mesh tape.',
            'Apply two coats of RedGard or Hydro Ban, achieving a continuous solidified membrane.',
            'Flood test shower pans for 24 hours before tiling.',
          ],
          checklist: [
            'Screw spacing correct',
            'Mesh tape on seams',
            '2 coats waterproofing',
            '24hr Flood test passed',
          ],
          critical:
            'Never use drywall screws for cement board. Use alkali-resistant screws only.',
        },
      },
      {
        id: 't-02',
        title: 'Grout Cleanup Protocol',
        description: 'Preventing haze and ensuring clean lines.',
        lastUpdated: 'Aug 14, 2023',
        content: {
          overview:
            'Haze left overnight requires acid washing, which risks damage. Clean as you go.',
          steps: [
            'Begin cleanup 15-30 minutes after grouting, when grout is firm to touch.',
            'Use a damp sponge (not wet) to emulsify surface grout.',
            'Wipe diagonally across joints.',
            'Perform a final buff with a microfiber cloth once dry haze appears.',
          ],
          checklist: [
            'Sponge wrung out fully',
            'Diagonal wiping',
            'Water changed frequently',
            'Final microfiber buff',
          ],
          critical:
            "Do not dump grout water in clients' sinks or bathtubs. Use designated washout area.",
        },
      },
    ],
  },
  masonry: {
    title: 'Masonry',
    iconName: 'BrickWall',
    color: 'bg-orange-100 text-orange-600',
    manuals: [
      {
        id: 'm-01',
        title: 'Brick Veneer Anchoring',
        description: 'Spacing and installation of wall ties.',
        lastUpdated: 'Jan 10, 2024',
        content: {
          overview:
            'Wall ties are the structural integrity of the veneer. Spacing is non-negotiable.',
          steps: [
            'Install corrugated wall ties every 16 inches vertically and 24 inches horizontally.',
            'Ties must be nailed into studs, not just sheathing.',
            'Maintain a 1-inch air gap between brick and sheathing.',
            'Keep the air gap free of mortar droppings.',
          ],
          checklist: [
            '16x24 spacing',
            'Nailed to studs',
            '1-inch air gap',
            'Weep holes clear',
          ],
          critical:
            'Ensure weep holes are installed every 32 inches at the bottom course.',
        },
      },
    ],
  },
  carpentry: {
    title: 'Carpentry',
    iconName: 'Hammer',
    color: 'bg-amber-100 text-amber-700',
    manuals: [
      {
        id: 'c-01',
        title: 'Finish Trim Standards',
        description: 'Coping joints, nailing patterns, and caulk prep.',
        lastUpdated: 'Dec 01, 2023',
        content: {
          overview:
            'LC Custom is known for seamless trim work. We cope inside corners; we do not miter them.',
          steps: [
            'Cope all inside corners for baseboard and crown molding.',
            'Miter outside corners and glue the joint with wood glue.',
            'Nail into studs (locate them first).',
            'Set nails slightly below surface for putty.',
          ],
          checklist: [
            'Inside corners coped',
            'Outside corners glued',
            'Nails set',
            'Studs hit',
          ],
          critical:
            'Do not leave hammer marks on trim. Use a nail set or gun adjustment.',
        },
      },
      {
        id: 'c-02',
        title: 'Window Installation & Flashing',
        description: 'Waterproofing sequence for window installs.',
        lastUpdated: 'Feb 15, 2024',
        content: {
          overview:
            'Water intrusion is the #1 liability. Follow the flashing tape sequence strictly.',
          steps: [
            'Install sill pan flashing first (or flex wrap).',
            'Caulk the back of the window nailing fin (top and sides, NOT bottom).',
            'Install window level and plumb.',
            'Flash sides (jambs) over the fin.',
            'Flash top (head) over the side flashing.',
          ],
          checklist: [
            'Sill pan installed',
            'Caulk pattern correct',
            'Window plumb/level',
            'Shingled flashing (bottom up)',
          ],
          critical:
            'Never tape the bottom flange. Water must be able to escape if it gets behind.',
        },
      },
    ],
  },
  electrical: {
    title: 'Electrical',
    iconName: 'Zap',
    color: 'bg-yellow-100 text-yellow-600',
    manuals: [
      {
        id: 'e-01',
        title: 'Low Voltage Pre-Wire',
        description: 'Data and coax handling during rough-in.',
        lastUpdated: 'Sep 22, 2023',
        content: {
          overview:
            'Do not treat Cat6 like Romex. Kinks and staples destroy signal quality.',
          steps: [
            'Use specialized low-voltage staples or J-hooks.',
            'Do not run parallel to high voltage lines (keep 12 inches separation).',
            'Cross high voltage lines at 90-degree angles only.',
            'Leave 12 inches of slack at the box.',
          ],
          checklist: [
            'No crushed cables',
            '12-inch separation',
            'Slack loop left',
            'Boxes labeled',
          ],
          critical: 'Do not strip the cable jacket inside the wall cavity.',
        },
      },
    ],
  },
  safety: {
    title: 'Site Safety',
    iconName: 'HardHat',
    color: 'bg-red-100 text-red-600',
    manuals: [
      {
        id: 's-01',
        title: 'Daily Site Cleanup',
        description: 'End of day protocols for all subs.',
        lastUpdated: 'Jan 01, 2024',
        content: {
          overview:
            'A clean site is a safe site. All trades are responsible for their own debris.',
          steps: [
            'Sweep work area before leaving.',
            'Organize materials/tools to prevent trip hazards.',
            'Cover open floor vents or drains.',
            'Ensure temporary power is turned off or safe.',
          ],
          checklist: [
            'Debris removed',
            'Tools secured',
            'Walkways clear',
            'Lights off',
          ],
          critical:
            'Food trash must be removed from the site daily to prevent pests.',
        },
      },
    ],
  },
};

const ICON_MAP = {
  Hammer,
  Droplet,
  BrickWall,
  Grid3X3,
  Zap,
  HardHat,
  FileText,
  Waves,
  Wrench,
  ShieldCheck,
};

const AIChatWidget = ({
  categoryId,
  manualContext,
  manualData,
  externalQuery,
  onExternalQueryHandled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Determine Agent Persona
  const agent = AGENT_PERSONAS[categoryId] || AGENT_PERSONAS.default;

  // Initialize Chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'agent',
          text: manualContext
            ? `I see you're working on "${manualContext}". ${agent.greeting}`
            : agent.greeting,
        },
      ]);
    }
  }, [isOpen, categoryId, manualContext]);

  // Handle External Queries
  useEffect(() => {
    if (externalQuery) {
      setIsOpen(true);
      const lastMsg = messages[messages.length - 1];
      if (!lastMsg || lastMsg.text !== externalQuery) {
        handleSend(externalQuery);
        onExternalQueryHandled && onExternalQueryHandled();
      }
    }
  }, [externalQuery]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- GEMINI API CALL ---
  const callGemini = async (userMessage) => {
    const apiKey = ''; // API Key injected by environment
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const contextString = manualData
      ? JSON.stringify(manualData)
      : 'No specific manual open.';

    const systemPrompt = `You are ${agent.name}, a ${agent.role} for LC Custom Construction.
    Your tone is: ${agent.greeting}.
    
    User Context:
    The user is currently viewing the manual: "${manualContext}".
    Here is the FULL CONTENT of the manual they are looking at:
    ${contextString}
    
    Instructions:
    1. Answer the user's question based strictly on the manual content provided if possible.
    2. If the answer is NOT in the manual, use your general expert knowledge as a ${agent.role} to answer, but mention that it is a general industry standard.
    3. Keep answers concise, professional, and safety-focused. Use bullet points for steps.
    4. If the user asks for an explanation of a step, break it down simply.
    `;

    const payload = {
      contents: [{ parts: [{ text: userMessage }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm having trouble analyzing the data. Please check your connection."
      );
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Connection error. I cannot reach the main server right now.';
    }
  };

  const handleSend = async (overrideInput = null) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setIsTyping(true);

    const responseText = await callGemini(textToSend);

    setIsTyping(false);
    setMessages((prev) => [...prev, { role: 'agent', text: responseText }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div
        className={`pointer-events-auto bg-white rounded-2xl shadow-2xl border border-slate-200 w-[calc(100vw-48px)] md:w-96 overflow-hidden transition-all duration-300 origin-bottom-right mb-4 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none h-0'
        }`}
      >
        {/* Header */}
        <div
          className={`${agent.color} p-4 flex justify-between items-center text-white shadow-md`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm relative">
              <Bot size={20} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight flex items-center gap-2">
                {agent.name}
                <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-mono">
                  Gemini
                </span>
              </h3>
              <p className="text-[10px] opacity-90 uppercase tracking-wider font-medium">
                {agent.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 bg-slate-50 overflow-y-auto p-4 space-y-4">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-full">
              Context: {manualContext || 'General'}
            </span>
          </div>

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#0C1A2A] text-white rounded-br-none'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-400 border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center gap-2 shadow-sm">
                <Sparkles size={14} className="animate-spin text-purple-500" />
                <span className="font-medium text-slate-500">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <input
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC947] focus:border-transparent transition-all"
            placeholder="Ask about codes, specs, or procedures..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={() => handleSend()}
            className={`${agent.color} text-white p-2.5 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:shadow-none`}
            disabled={!input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Toggle Button (Always Visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto ${agent.color} text-white p-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group ring-4 ring-white/20`}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        {!isOpen && (
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 flex flex-col items-start pl-0 group-hover:pl-2">
            <span className="whitespace-nowrap text-sm font-bold">
              Ask {agent.name.split(' ')[0]}
            </span>
            <span className="whitespace-nowrap text-[10px] opacity-90">
              Expert Mode Active
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

const Header = ({ onHome, onSearch, searchTerm, onAdminClick, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#0C1A2A] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          {/* Logo - clickable to home */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onHome}
          >
            <div className="bg-[#FFC947] p-1.5 rounded text-[#0C1A2A] font-bold">
              LC
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">LC CUSTOM</h1>
              <p className="text-xs text-slate-400 tracking-wider">
                {isAdmin ? 'ADMIN DASHBOARD' : 'CONSTRUCTION MANUALS'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Admin Button */}
            {isAdmin && (
              <button
                onClick={onAdminClick}
                className="hidden md:block text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
              >
                Exit Admin
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1A2C42] rounded-lg mb-3 overflow-hidden animate-fade-in">
            <button
              onClick={() => {
                onHome();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 border-b border-slate-700 hover:bg-[#2A3C52] text-sm"
            >
              Home / Trade Categories
            </button>
            <button
              onClick={() => {
                onAdminClick();
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm ${
                isAdmin
                  ? 'text-red-400 hover:bg-red-900/20'
                  : 'text-[#FFC947] hover:bg-yellow-900/20'
              }`}
            >
              {isAdmin ? 'Exit Admin Mode' : 'Admin Login'}
            </button>
            <div className="px-4 py-2 text-xs text-slate-500 flex items-center gap-2 border-t border-slate-700 bg-[#162436]">
              <Phone size={12} /> Site Super: (555) 123-4567
            </div>
          </div>
        )}

        {/* Search Bar */}
        {!isAdmin && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search procedures (e.g., grout, flashing)..."
              className="w-full bg-[#1A2C42] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC947] placeholder-slate-500 border border-slate-700"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-slate-500"
              size={16}
            />
          </div>
        )}
      </div>
    </header>
  );
};

const CategoryCard = ({ categoryKey, data, onClick }) => {
  const Icon = ICON_MAP[data.iconName] || FileText;
  return (
    <button
      onClick={() => onClick(categoryKey)}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-all active:scale-95 group"
    >
      <div
        className={`p-4 rounded-full mb-3 ${data.color} group-hover:scale-110 transition-transform`}
      >
        <Icon size={32} />
      </div>
      <h3 className="font-bold text-slate-800 text-lg">{data.title}</h3>
      <p className="text-slate-500 text-xs mt-1">
        {data.manuals.length} Protocols
      </p>
    </button>
  );
};

const ManualListItem = ({
  manual,
  onClick,
  isAdmin,
  onDelete,
  onView,
  progress,
}) => {
  const completedCount = progress
    ? Object.values(progress).filter(Boolean).length
    : 0;
  const totalCount = manual.content.checklist.length;
  const percent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = percent === 100 && totalCount > 0;

  return (
    <div
      onClick={() => onClick(manual)}
      className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-3 cursor-pointer hover:border-[#FFC947] transition-all flex justify-between items-center group relative overflow-hidden"
    >
      {/* Progress Background Hint */}
      {!isAdmin && percent > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      )}

      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
            {manual.title}
          </h4>
          {isAdmin && <Edit size={14} className="text-blue-500 opacity-50" />}
          {isComplete && !isAdmin && (
            <CheckCircle2 size={16} className="text-emerald-500" />
          )}
        </div>
        <p className="text-xs text-slate-500 line-clamp-1">
          {manual.description}
        </p>

        {!isAdmin && totalCount > 0 && (
          <p className="text-[10px] font-bold tracking-wider uppercase mt-2 text-slate-400">
            {isComplete ? (
              <span className="text-emerald-600">Complete</span>
            ) : percent > 0 ? (
              <span className="text-orange-500">
                {completedCount}/{totalCount} Steps Completed
              </span>
            ) : (
              <span>Not Started</span>
            )}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isAdmin ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(manual);
              }}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Preview as User"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(manual.id);
              }}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Manual"
            >
              <Trash2 size={18} />
            </button>
          </>
        ) : (
          <ChevronRight
            className="text-slate-300 group-hover:text-orange-500"
            size={20}
          />
        )}
      </div>
    </div>
  );
};

const ManualWizard = ({
  manual,
  onBack,
  progress,
  onToggleCheck,
  onReset,
  onAskAI,
}) => {
  // Determine screens:
  // 0: Intro/Overview
  // 0.5: Pre-Flight (If exists)
  // 1 to N: Steps
  // N+1: Critical
  // N+2: Checklist

  const hasPreflight =
    manual.content.preflight && manual.content.preflight.length > 0;
  const stepsCount = manual.content.steps.length;

  const totalScreens = 1 + (hasPreflight ? 1 : 0) + stepsCount + 1 + 1;

  const [currentScreen, setCurrentScreen] = useState(0);

  // Helpers to identify what current screen is
  const isOverview = currentScreen === 0;
  const isPreflight = hasPreflight && currentScreen === 1;
  const stepOffset = 1 + (hasPreflight ? 1 : 0);
  const isStep =
    currentScreen >= stepOffset && currentScreen < stepOffset + stepsCount;
  const currentStepIndex = isStep ? currentScreen - stepOffset : -1;
  const isCritical = currentScreen === stepOffset + stepsCount;
  const isChecklist = currentScreen === stepOffset + stepsCount + 1;

  const nextScreen = () => {
    if (currentScreen < totalScreens - 1) setCurrentScreen((c) => c + 1);
  };

  const prevScreen = () => {
    if (currentScreen > 0) setCurrentScreen((c) => c - 1);
  };

  // Calculate checklist progress
  const completedCount = progress
    ? Object.values(progress).filter(Boolean).length
    : 0;
  const totalChecklist = manual.content.checklist.length;
  const checklistPercent =
    totalChecklist > 0
      ? Math.round((completedCount / totalChecklist) * 100)
      : 0;

  // Calculate Wizard Progress (Visual bar at top)
  const wizardProgress = ((currentScreen + 1) / totalScreens) * 100;

  // Handle string steps vs object steps
  const currentStepData = isStep
    ? manual.content.steps[currentStepIndex]
    : null;
  const stepText = isStep
    ? typeof currentStepData === 'string'
      ? currentStepData
      : currentStepData.text
    : '';
  const stepDiagram = isStep
    ? typeof currentStepData === 'object'
      ? currentStepData.diagram
      : null
    : null;
  const stepCustomDiagram = isStep
    ? typeof currentStepData === 'object'
      ? currentStepData.customDiagram
      : null
    : null;
  const stepImage = isStep
    ? typeof currentStepData === 'object'
      ? currentStepData.image
      : null
    : null;
  const stepExampleImage = isStep
    ? typeof currentStepData === 'object'
      ? currentStepData.exampleImage
      : null
    : null;

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-140px)] bg-[#F1F3F5] -mx-4 -my-6 px-4 py-6">
      {/* Top Navigation Bar - Dark Mode Style */}
      <div className="bg-[#0C1A2A] text-white p-4 rounded-t-xl shadow-lg border-b border-slate-700">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold leading-tight">{manual.title}</h2>
            <span className="text-[#FFC947] text-xs font-bold tracking-wider uppercase opacity-90">
              {isOverview
                ? 'Overview'
                : isPreflight
                ? 'Pre-Flight Check'
                : isStep
                ? `Action Step ${currentStepIndex + 1}`
                : isCritical
                ? 'Critical Warning'
                : 'Final Inspection'}
            </span>
          </div>
          <div className="bg-white/10 px-3 py-1 rounded text-sm font-bold font-mono flex-shrink-0">
            {currentScreen + 1} / {totalScreens}
          </div>
        </div>

        {/* Custom Yellow Progress Bar */}
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FFC947] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,201,71,0.5)]"
            style={{ width: `${wizardProgress}%` }}
          />
        </div>
      </div>

      {/* Content Area - Flex Grow */}
      <div className="flex-grow flex flex-col relative bg-white rounded-b-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* SCREEN: OVERVIEW */}
        {isOverview && (
          <div className="p-8 flex flex-col h-full items-center text-center animate-fade-in overflow-y-auto">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#0C1A2A] mb-6 border border-blue-100 flex-shrink-0">
              <FileText size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0C1A2A] mb-4">
              Start Guide
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-lg mb-8">
              {manual.content.overview}
            </p>

            <div className="bg-slate-50 p-4 rounded-lg text-left w-full max-w-sm border border-slate-200 mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Scope of Work
              </h4>
              <div className="flex justify-between text-sm text-slate-700 border-b border-slate-200 pb-2 mb-2">
                <span>Total Steps</span>
                <span className="font-bold">{stepsCount}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Checklist Items</span>
                <span className="font-bold">{totalChecklist}</span>
              </div>
            </div>

            {/* Resources Section Added */}
            {manual.content.resources && (
              <div className="w-full max-w-sm mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-left">
                  Training & Docs
                </h4>
                <div className="space-y-2 text-left">
                  {manual.content.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      className="flex items-center p-3 bg-white rounded-lg border border-slate-200 text-slate-700 hover:border-[#FFC947] hover:shadow-sm transition-all group"
                    >
                      {res.type === 'video' ? (
                        <Youtube
                          size={18}
                          className="text-red-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <FileText
                          size={18}
                          className="text-blue-500 mr-3 flex-shrink-0"
                        />
                      )}
                      <span className="text-sm font-bold">{res.title}</span>
                      <ExternalLink
                        size={14}
                        className="ml-auto text-slate-400 group-hover:text-slate-600"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCREEN: PRE-FLIGHT CHECKLIST */}
        {isPreflight && (
          <div className="p-0 flex flex-col h-full animate-fade-in bg-[#F8FAFC]">
            <div className="p-6 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="text-[#F47A28]" size={20} />
                <h3 className="text-xl font-bold text-[#0C1A2A]">
                  Pre-Flight Checklist
                </h3>
              </div>
              <p className="text-slate-500 text-sm mb-4">
                Confirm all equipment for{' '}
                <span className="font-bold text-slate-800">
                  Option A: Well Water
                </span>{' '}
                is present.
              </p>
            </div>

            <div className="flex-grow overflow-y-auto px-6 pb-6">
              {manual.content.preflight.map((section, secIdx) => (
                <div key={secIdx} className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </h4>
                  <div className="space-y-3">
                    {section.items.map((item, itemIdx) => {
                      const itemText =
                        typeof item === 'string' ? item : item.text;
                      const itemUrl =
                        typeof item === 'object' ? item.url : null;
                      const itemTag =
                        typeof item === 'object' ? item.tag : null;

                      // Generate a unique key for this pre-flight item to track progress
                      const uniqueKey = `pf-${secIdx}-${itemIdx}`;
                      const isChecked = !!(progress && progress[uniqueKey]);

                      return (
                        <div
                          key={itemIdx}
                          onClick={() => onToggleCheck(uniqueKey)}
                          className={`p-4 rounded-lg border shadow-sm flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-500 shadow-emerald-100'
                              : 'bg-white border-slate-200 hover:border-[#FFC947] hover:shadow-md'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors duration-200 ${
                              isChecked
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && (
                              <CheckCircle2 size={16} className="text-white" />
                            )}
                          </div>

                          <div className="flex-1">
                            {itemUrl ? (
                              <div className="flex items-center gap-2">
                                <a
                                  href={itemUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()} // Prevent toggling when clicking link
                                  className={`font-bold text-sm leading-tight block flex items-center gap-1 hover:underline ${
                                    isChecked
                                      ? 'text-emerald-900'
                                      : 'text-blue-600 hover:text-blue-800'
                                  }`}
                                >
                                  {itemText} <ExternalLink size={10} />
                                </a>
                              </div>
                            ) : (
                              <span
                                className={`font-medium text-sm leading-tight block ${
                                  isChecked
                                    ? 'text-emerald-900'
                                    : 'text-slate-700'
                                }`}
                              >
                                {itemText}
                              </span>
                            )}

                            {itemTag && (
                              <span className="inline-block mt-2 text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full border border-red-200">
                                <ShieldCheck
                                  size={10}
                                  className="inline mr-1"
                                />
                                {itemTag}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN: STEPS */}
        {isStep && (
          <div className="p-6 md:p-8 flex flex-col h-full animate-fade-in overflow-y-auto">
            <div className="flex items-center mb-4">
              <span className="text-4xl md:text-6xl font-black text-slate-100 mr-4">
                {currentStepIndex + 1}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-[#0C1A2A] uppercase tracking-wider">
                Action Step
              </h3>
            </div>

            <div className="flex-grow flex flex-col">
              {/* Render Image (If exists) - Placed under header */}
              {stepImage && (
                <div className="mb-6 rounded-lg overflow-hidden border border-slate-200 shadow-sm max-h-60 relative group">
                  <img
                    src={stepImage}
                    alt={`Visual for step ${currentStepIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://via.placeholder.com/800x400?text=Image+Load+Error';
                    }}
                  />
                  <button
                    onClick={() => window.open(stepImage, '_blank')}
                    className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              )}

              <p className="text-lg md:text-2xl font-medium text-slate-800 leading-snug mb-6">
                {stepText}
              </p>

              {/* Gemini AI Feature Button */}
              <button
                onClick={() =>
                  onAskAI(
                    `Can you explain step ${
                      currentStepIndex + 1
                    } ("${stepText}") in simple terms?`
                  )
                }
                className="mb-6 flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors w-fit border border-purple-200"
              >
                <Sparkles size={14} />✨ Explain with AI
              </button>

              {/* Diagram Injection */}
              {(stepDiagram || stepCustomDiagram) && (
                <div className="flex-grow min-h-[180px]">
                  <BlueprintDiagram
                    type={stepDiagram || 'custom'}
                    customUrl={stepCustomDiagram}
                  />
                </div>
              )}

              {/* Example Image Under Diagram */}
              {stepExampleImage && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                    <Camera size={12} className="mr-1" /> Real World Example
                  </p>
                  <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative group">
                    <img
                      src={stepExampleImage}
                      alt="Real world example"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://via.placeholder.com/800x400?text=Image+Load+Error';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto pt-4 text-slate-400 text-sm flex items-center border-t border-slate-100">
              <Play
                size={14}
                className="mr-2 text-[#F47A28]"
                fill="currentColor"
              />
              <span>Perform this action before proceeding.</span>
            </div>
          </div>
        )}

        {/* SCREEN: CRITICAL */}
        {isCritical && (
          <div className="p-8 flex flex-col h-full justify-center items-center text-center bg-red-50 animate-fade-in">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 animate-pulse">
              <AlertTriangle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">
              CRITICAL WARNING
            </h2>
            <p className="text-red-700 text-xl font-medium leading-relaxed max-w-lg">
              {manual.content.critical}
            </p>
            <p className="mt-8 text-red-500 text-sm">
              Review this carefully. Failure here results in rework.
            </p>
          </div>
        )}

        {/* SCREEN: CHECKLIST */}
        {isChecklist && (
          <div className="p-6 flex flex-col h-full animate-fade-in overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0C1A2A]">
                Final Inspection
              </h2>
              <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {checklistPercent}% Complete
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              {manual.content.checklist.map((item, idx) => {
                const isChecked = !!(progress && progress[idx]);
                return (
                  <label
                    key={idx}
                    className={`flex items-start p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-white border-slate-100 hover:border-[#FFC947]'
                    }`}
                  >
                    <div className="relative flex items-center mt-0.5">
                      <input
                        type="checkbox"
                        className="peer w-6 h-6 border-2 border-slate-300 rounded checked:bg-emerald-500 checked:border-emerald-500 focus:ring-emerald-200 transition-colors cursor-pointer appearance-none"
                        checked={isChecked}
                        onChange={() => onToggleCheck(idx)}
                      />
                      <CheckCircle2
                        size={16}
                        className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                      />
                    </div>
                    <span
                      className={`ml-4 text-lg transition-colors ${
                        isChecked
                          ? 'text-emerald-900 font-medium'
                          : 'text-slate-700'
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>

            {checklistPercent === 100 && (
              <div className="mt-6 bg-emerald-600 text-white p-4 rounded-xl text-center font-bold text-lg animate-bounce-short shadow-lg shadow-emerald-200">
                Procedure Complete!
              </div>
            )}
            {checklistPercent > 0 && checklistPercent < 100 && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={onReset}
                  className="text-sm text-slate-400 hover:text-red-500 flex items-center gap-1"
                >
                  <RotateCcw size={14} /> Reset Progress
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Controls - Dark Mode Style */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={currentScreen === 0 ? onBack : prevScreen}
          className="flex-1 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          {currentScreen === 0 ? 'Exit' : 'Back'}
        </button>
        {currentScreen < totalScreens - 1 ? (
          <button
            onClick={nextScreen}
            className="flex-[2] bg-[#0C1A2A] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1A2C42] transition-colors flex items-center justify-center shadow-lg"
          >
            {currentScreen === 0 ? 'Start Procedure' : 'Next'}
            <ArrowRight size={16} className="ml-2" />
          </button>
        ) : (
          <button
            onClick={onBack}
            className="flex-[2] bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center shadow-lg shadow-emerald-100"
          >
            Finish & Exit
          </button>
        )}
      </div>
    </div>
  );
};

const AdminEditor = ({ manual, onSave, onCancel }) => {
  // Multi-page editor state
  const [editorStep, setEditorStep] = useState(0);
  // 0: Basics, 1: Prep Work (Res/Preflight), 2: Procedures (Steps), 3: Final (Checklist/Critical)

  // Ensure deep structure exists for new fields
  const [formData, setFormData] = useState({
    ...manual,
    id: manual?.id || `new-${Date.now()}`,
    title: manual?.title || '',
    description: manual?.description || '',
    lastUpdated:
      manual?.lastUpdated ||
      new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    content: {
      overview: manual?.content?.overview || '',
      resources: manual?.content?.resources || [],
      preflight: manual?.content?.preflight || [],
      steps: manual?.content?.steps || [''],
      checklist: manual?.content?.checklist || [''],
      critical: manual?.content?.critical || '',
    },
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content, [field]: value },
    }));
  };

  // Generic Array Handler
  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData.content[field]];
    newArray[index] = value;
    handleContentChange(field, newArray);
  };

  // --- Complex Step Handler (String/Object Mixed) ---
  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.content.steps];
    const currentStep = newSteps[index];

    // Initialize object if currently string or create copy
    let stepObj =
      typeof currentStep === 'string'
        ? {
            text: currentStep,
            diagram: null,
            image: null,
            exampleImage: null,
            customDiagram: null,
          }
        : { ...currentStep };

    if (field === 'text') stepObj.text = value;
    if (field === 'diagram') stepObj.diagram = value === 'none' ? null : value;
    if (field === 'image') stepObj.image = value === '' ? null : value; // Handle image URL
    if (field === 'exampleImage')
      stepObj.exampleImage = value === '' ? null : value; // Handle Example Image URL
    if (field === 'customDiagram')
      stepObj.customDiagram = value === '' ? null : value; // Handle Custom Diagram URL

    // Optimize: convert back to string if no extra props (optional, but cleaner data)
    if (
      !stepObj.diagram &&
      !stepObj.image &&
      !stepObj.exampleImage &&
      !stepObj.customDiagram
    ) {
      newSteps[index] = stepObj.text;
    } else {
      newSteps[index] = stepObj;
    }

    handleContentChange('steps', newSteps);
  };

  const addStep = () =>
    handleContentChange('steps', [...formData.content.steps, '']);
  const removeStep = (idx) =>
    handleContentChange(
      'steps',
      formData.content.steps.filter((_, i) => i !== idx)
    );

  // --- Resource Handler ---
  const addResource = () =>
    handleContentChange('resources', [
      ...formData.content.resources,
      { type: 'pdf', title: '', url: '' },
    ]);
  const updateResource = (idx, field, val) => {
    const newRes = [...formData.content.resources];
    newRes[idx] = { ...newRes[idx], [field]: val };
    handleContentChange('resources', newRes);
  };
  const removeResource = (idx) =>
    handleContentChange(
      'resources',
      formData.content.resources.filter((_, i) => i !== idx)
    );

  // --- Preflight Handler ---
  const ensurePreflightStruct = () => {
    if (
      !formData.content.preflight ||
      formData.content.preflight.length === 0
    ) {
      return [{ title: 'Required Equipment', items: [] }];
    }
    return formData.content.preflight;
  };

  const addPreflightItem = () => {
    const currentPre = ensurePreflightStruct();
    const newItems = [...currentPre[0].items, { text: '' }];
    const newPre = [...currentPre];
    newPre[0] = { ...newPre[0], items: newItems };
    handleContentChange('preflight', newPre);
  };

  const updatePreflightItem = (idx, val) => {
    const currentPre = ensurePreflightStruct();
    const newItems = [...currentPre[0].items];
    newItems[idx] = { text: val };
    const newPre = [...currentPre];
    newPre[0] = { ...newPre[0], items: newItems };
    handleContentChange('preflight', newPre);
  };

  const removePreflightItem = (idx) => {
    const currentPre = ensurePreflightStruct();
    const newItems = currentPre[0].items.filter((_, i) => i !== idx);
    const newPre = [...currentPre];
    newPre[0] = { ...newPre[0], items: newItems };
    handleContentChange('preflight', newPre);
  };

  // Navigation
  const nextStep = () => setEditorStep((c) => Math.min(c + 1, 3));
  const prevStep = () => setEditorStep((c) => Math.max(c - 1, 0));

  // Simple state for managing which step has the image input open
  const [openImageInput, setOpenImageInput] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col h-[600px] animate-fade-in overflow-hidden">
      {/* Admin Header */}
      <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center">
          {manual ? (
            <Edit className="mr-2 text-slate-500" size={20} />
          ) : (
            <Plus className="mr-2 text-slate-500" size={20} />
          )}
          <div>
            <h2 className="font-bold text-slate-900">
              {manual ? 'Edit Manual' : 'New Procedure'}
            </h2>
            <div className="flex space-x-2 mt-1">
              {['Basics', 'Prep Work', 'Procedures', 'Final'].map(
                (label, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      i === editorStep
                        ? 'bg-[#FFC947]'
                        : i < editorStep
                        ? 'bg-slate-400'
                        : 'bg-slate-200'
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-red-500"
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-grow p-6 overflow-y-auto">
        {/* STEP 0: BASICS */}
        {editorStep === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Procedure Title
              </label>
              <input
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FFC947] outline-none font-bold text-lg"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Well Water Installation"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Short Description
              </label>
              <input
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FFC947] outline-none text-slate-600"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Summary for dashboard card..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Overview & Scope
              </label>
              <textarea
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FFC947] outline-none h-32 text-slate-700 leading-relaxed"
                value={formData.content.overview}
                onChange={(e) =>
                  handleContentChange('overview', e.target.value)
                }
                placeholder="Detailed explanation of the job scope..."
              />
            </div>
          </div>
        )}

        {/* STEP 1: PREP WORK */}
        {editorStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            {/* Resources */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex justify-between">
                <span>Digital Resources (Links/PDFs)</span>
                <button
                  onClick={addResource}
                  className="text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <Plus size={12} /> Add
                </button>
              </label>
              <div className="space-y-3">
                {formData.content.resources.map((res, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 items-start bg-slate-50 p-2 rounded border border-slate-200"
                  >
                    <select
                      className="p-2 border border-slate-300 rounded text-xs bg-white"
                      value={res.type}
                      onChange={(e) =>
                        updateResource(idx, 'type', e.target.value)
                      }
                    >
                      <option value="pdf">PDF</option>
                      <option value="video">Video</option>
                    </select>
                    <div className="flex-grow space-y-1">
                      <input
                        className="w-full p-1.5 border border-slate-300 rounded text-sm"
                        placeholder="Title (e.g. Spec Sheet)"
                        value={res.title}
                        onChange={(e) =>
                          updateResource(idx, 'title', e.target.value)
                        }
                      />
                      <input
                        className="w-full p-1.5 border border-slate-300 rounded text-xs text-slate-500 font-mono"
                        placeholder="https://..."
                        value={res.url}
                        onChange={(e) =>
                          updateResource(idx, 'url', e.target.value)
                        }
                      />
                    </div>
                    <button
                      onClick={() => removeResource(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {formData.content.resources.length === 0 && (
                  <p className="text-sm text-slate-400 italic">
                    No resources attached.
                  </p>
                )}
              </div>
            </div>

            {/* Pre-Flight */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex justify-between">
                <span>Required Equipment List</span>
                <button
                  onClick={addPreflightItem}
                  className="text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <Plus size={12} /> Add Item
                </button>
              </label>
              <div className="space-y-2">
                {ensurePreflightStruct()[0].items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Wrench size={16} className="text-slate-300" />
                    <input
                      className="flex-1 p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-[#FFC947] outline-none"
                      placeholder="Item Name..."
                      value={typeof item === 'string' ? item : item.text}
                      onChange={(e) => updatePreflightItem(idx, e.target.value)}
                    />
                    <button
                      onClick={() => removePreflightItem(idx)}
                      className="text-slate-300 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {ensurePreflightStruct()[0].items.length === 0 && (
                  <p className="text-sm text-slate-400 italic">
                    No equipment listed.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROCEDURES */}
        {editorStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex justify-between items-center">
              <span>Execution Steps</span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                Drag & Drop Disabled
              </span>
            </label>

            {formData.content.steps.map((step, idx) => {
              const isObj = typeof step === 'object';
              const textVal = isObj ? step.text : step;
              const diagVal = isObj ? step.diagram : null;
              const imgVal = isObj ? step.image : null;
              const exampleImgVal = isObj ? step.exampleImage : null;
              const customDiagVal = isObj ? step.customDiagram : null;

              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-3 rounded-lg border border-slate-200 group relative"
                >
                  <div className="flex gap-3 mb-2">
                    <span className="bg-slate-200 w-6 h-6 rounded-full text-slate-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-1">
                      {idx + 1}
                    </span>
                    <textarea
                      className="flex-1 p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-[#FFC947] outline-none min-h-[60px]"
                      value={textVal}
                      onChange={(e) =>
                        handleStepChange(idx, 'text', e.target.value)
                      }
                      placeholder="Describe action..."
                    />
                    <button
                      onClick={() => removeStep(idx)}
                      className="text-slate-300 hover:text-red-500 self-start"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Visual Attachments Toolbar */}
                  <div className="ml-9 flex items-center gap-3 flex-wrap">
                    {/* Diagram Dropdown */}
                    <div className="flex items-center gap-1">
                      <Maximize2
                        size={12}
                        className={diagVal ? 'text-blue-500' : 'text-slate-300'}
                      />
                      <select
                        className={`text-xs p-1 rounded border ${
                          diagVal
                            ? 'border-blue-300 bg-blue-50 text-blue-700 font-bold'
                            : 'border-slate-200 text-slate-500'
                        }`}
                        value={diagVal || 'none'}
                        onChange={(e) =>
                          handleStepChange(idx, 'diagram', e.target.value)
                        }
                      >
                        <option value="none">No Diagram</option>
                        <option value="custom">Custom Diagram</option>
                        <option value="layout">System Layout</option>
                        <option value="bypass">3-Valve Bypass</option>
                        <option value="airgap">Air Gap Detail</option>
                      </select>
                    </div>

                    {/* Image Button */}
                    <button
                      onClick={() =>
                        setOpenImageInput(openImageInput === idx ? null : idx)
                      }
                      className={`flex items-center gap-1 text-xs border rounded p-1 hover:bg-slate-100 ${
                        imgVal || exampleImgVal
                          ? 'border-purple-300 bg-purple-50 text-purple-700 font-bold'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <ImageIcon size={12} />
                      {imgVal || exampleImgVal ? 'Edit Images' : 'Add Image'}
                    </button>
                  </div>

                  {/* Custom Diagram Input */}
                  {diagVal === 'custom' && (
                    <div className="ml-9 mt-2 p-2 bg-blue-50 border border-blue-200 rounded flex gap-2 items-center">
                      <span className="text-xs text-blue-700 font-bold w-20">
                        Blueprint URL:
                      </span>
                      <input
                        className="flex-1 text-xs border border-blue-200 rounded p-1 outline-none focus:border-blue-400"
                        value={customDiagVal || ''}
                        placeholder="https://... (Technical Drawing)"
                        onChange={(e) =>
                          handleStepChange(idx, 'customDiagram', e.target.value)
                        }
                      />
                    </div>
                  )}

                  {/* Collapsible Image URL Inputs */}
                  {(openImageInput === idx || imgVal || exampleImgVal) &&
                    openImageInput === idx && (
                      <div className="ml-9 mt-2 p-2 bg-white border rounded space-y-2">
                        <div className="flex gap-2 items-center">
                          <span className="text-xs text-slate-400 w-20">
                            Header Img:
                          </span>
                          <input
                            className="flex-1 text-xs border border-slate-200 rounded p-1 outline-none focus:border-purple-400"
                            value={imgVal || ''}
                            placeholder="URL for image ABOVE text..."
                            onChange={(e) =>
                              handleStepChange(idx, 'image', e.target.value)
                            }
                          />
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-xs text-slate-400 w-20">
                            Example:
                          </span>
                          <input
                            className="flex-1 text-xs border border-slate-200 rounded p-1 outline-none focus:border-purple-400"
                            value={exampleImgVal || ''}
                            placeholder="URL for example BELOW diagram..."
                            onChange={(e) =>
                              handleStepChange(
                                idx,
                                'exampleImage',
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                </div>
              );
            })}

            <button
              onClick={addStep}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex justify-center items-center"
            >
              <Plus size={16} className="mr-2" /> Add Step
            </button>
          </div>
        )}

        {/* STEP 3: FINAL */}
        {editorStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            {/* Checklist */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex justify-between">
                <span>Quality Assurance Checklist</span>
                <button
                  onClick={() =>
                    handleContentChange('checklist', [
                      ...formData.content.checklist,
                      '',
                    ])
                  }
                  className="text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <Plus size={12} /> Add
                </button>
              </label>
              <div className="space-y-2">
                {formData.content.checklist.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <input
                      className="flex-1 p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange('checklist', idx, e.target.value)
                      }
                      placeholder="Verification item..."
                    />
                    <button
                      onClick={() =>
                        handleContentChange(
                          'checklist',
                          formData.content.checklist.filter((_, i) => i !== idx)
                        )
                      }
                      className="text-slate-300 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <label className="block text-xs font-bold text-red-800 uppercase tracking-wider mb-2 flex items-center">
                <AlertTriangle size={14} className="mr-1" /> Critical Failure
                Point
              </label>
              <textarea
                className="w-full p-3 border border-red-200 rounded focus:ring-2 focus:ring-red-500 outline-none text-red-800 bg-white min-h-[80px]"
                value={formData.content.critical}
                onChange={(e) =>
                  handleContentChange('critical', e.target.value)
                }
                placeholder="What is the one mistake that ruins this job?"
              />
            </div>
          </div>
        )}
      </div>

      {/* Admin Navigation Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between">
        <button
          onClick={prevStep}
          disabled={editorStep === 0}
          className={`px-6 py-2 rounded-lg font-bold text-sm ${
            editorStep === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-white border border-transparent hover:border-slate-300'
          }`}
        >
          Back
        </button>

        {editorStep < 3 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-[#0C1A2A] text-white rounded-lg font-bold text-sm hover:bg-[#1A2C42] flex items-center shadow-lg"
          >
            Next <ChevronRight size={16} className="ml-1" />
          </button>
        ) : (
          <button
            onClick={() => onSave(formData)}
            className="px-8 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 flex items-center shadow-lg shadow-emerald-100"
          >
            <Save size={16} className="mr-2" /> Save Manual
          </button>
        )}
      </div>
    </div>
  );
};

const CategoryEditor = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [iconName, setIconName] = useState('FileText');
  const [colorTheme, setColorTheme] = useState('blue');

  const colors = [
    { id: 'blue', label: 'Blue', class: 'bg-blue-100 text-blue-600' },
    { id: 'emerald', label: 'Green', class: 'bg-emerald-100 text-emerald-600' },
    { id: 'orange', label: 'Orange', class: 'bg-orange-100 text-orange-600' },
    { id: 'amber', label: 'Amber', class: 'bg-amber-100 text-amber-700' },
    { id: 'red', label: 'Red', class: 'bg-red-100 text-red-600' },
    { id: 'cyan', label: 'Cyan', class: 'bg-cyan-100 text-cyan-600' },
    { id: 'purple', label: 'Purple', class: 'bg-purple-100 text-purple-600' },
    { id: 'slate', label: 'Gray', class: 'bg-slate-100 text-slate-600' },
  ];

  const handleSave = () => {
    if (!title.trim()) return alert('Title is required');
    const selectedColor = colors.find((c) => c.id === colorTheme).class;
    onSave({ title, iconName, color: selectedColor });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 animate-fade-in max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Add New Category
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Category Title
          </label>
          <input
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#FFC947] outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. HVAC"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Icon
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Object.keys(ICON_MAP).map((iconKey) => {
              const Icon = ICON_MAP[iconKey];
              return (
                <button
                  key={iconKey}
                  onClick={() => setIconName(iconKey)}
                  className={`p-2 rounded border flex justify-center items-center ${
                    iconName === iconKey
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Color Theme
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorTheme(c.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  c.class
                } ${
                  colorTheme === c.id
                    ? 'border-slate-900'
                    : 'border-transparent'
                }`}
              >
                {colorTheme === c.id && <CheckCircle2 size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#0C1A2A] text-white rounded-lg font-bold hover:bg-[#1A2C42]"
        >
          Create
        </button>
      </div>
    </div>
  );
};

const Footer = ({ onAdminClick, isAdmin }) => (
  <footer className="bg-[#0C1A2A] text-slate-400 py-6 text-center text-sm mt-auto">
    <div className="flex justify-center items-center space-x-2 mb-2">
      <Phone size={14} />
      <span>Site Super: (555) 123-4567</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <p>
        &copy; {new Date().getFullYear()} LC Custom Construction. Internal Use
        Only.
      </p>
      <button
        onClick={onAdminClick}
        className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors ${
          isAdmin
            ? 'bg-[#FFC947] text-[#0C1A2A] font-bold'
            : 'bg-slate-800 hover:bg-slate-700'
        }`}
      >
        <Lock size={10} />
        {isAdmin ? 'Admin Mode Active' : 'Admin Access'}
      </button>
    </div>
  </footer>
);

const App = () => {
  // --- Data & State Management with Persistence ---

  // 1. Content Data
  const [appData, setAppData] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_manuals_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      return INITIAL_DATA;
    }
  });

  // 2. User Progress Data (Checklists)
  const [userProgress, setUserProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_user_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeManual, setActiveManual] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // New State for handling external AI queries (from buttons)
  const [chatQuery, setChatQuery] = useState(null);

  // Persist data whenever it changes
  useEffect(() => {
    localStorage.setItem('lc_manuals_data', JSON.stringify(appData));
  }, [appData]);

  useEffect(() => {
    localStorage.setItem('lc_user_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // --- Dynamic Tailwind CSS Injection (Fix for missing styles) ---
  useEffect(() => {
    if (!document.getElementById('tailwind-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-script';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  // --- Checklist Logic ---

  const handleChecklistToggle = (manualId, index) => {
    setUserProgress((prev) => {
      const manualProgress = prev[manualId] || {};
      return {
        ...prev,
        [manualId]: {
          ...manualProgress,
          [index]: !manualProgress[index], // Toggle boolean
        },
      };
    });
  };

  const handleResetChecklist = (manualId) => {
    if (!window.confirm('Clear all checklist progress for this manual?'))
      return;
    setUserProgress((prev) => {
      const newState = { ...prev };
      delete newState[manualId];
      return newState;
    });
  };

  // --- Admin Logic ---

  const handleCreateCategory = (newCategory) => {
    const id = newCategory.title.toLowerCase().replace(/\s+/g, '-');
    if (appData[id]) return alert('Category already exists!');

    setAppData((prev) => ({
      ...prev,
      [id]: {
        ...newCategory,
        manuals: [],
      },
    }));
    setView('home');
  };

  const handleUpdateManual = (updatedManual) => {
    setAppData((prev) => {
      const newData = { ...prev };
      const catKey = activeCategory;
      const manualExists = newData[catKey].manuals.find(
        (m) => m.id === updatedManual.id
      );

      if (manualExists) {
        newData[catKey].manuals = newData[catKey].manuals.map((m) =>
          m.id === updatedManual.id ? updatedManual : m
        );
      } else {
        newData[catKey].manuals.push(updatedManual);
      }
      return newData;
    });
    // Return to list view
    setView('category');
    setActiveManual(null);
  };

  const handleDeleteManual = (manualId) => {
    if (!window.confirm('Are you sure you want to delete this manual?')) return;
    setAppData((prev) => {
      const newData = { ...prev };
      newData[activeCategory].manuals = newData[activeCategory].manuals.filter(
        (m) => m.id !== manualId
      );
      return newData;
    });
  };

  const startEdit = (manual) => {
    setActiveManual(manual);
    setView('admin-edit');
  };

  // --- Navigation Logic ---

  const filteredManuals = useMemo(() => {
    if (!searchTerm) return [];
    const results = [];
    Object.keys(appData).forEach((catKey) => {
      const category = appData[catKey];
      category.manuals.forEach((manual) => {
        if (
          manual.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          manual.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            ...manual,
            categoryTitle: category.title,
            categoryKey: catKey,
          });
        }
      });
    });
    return results;
  }, [searchTerm, appData]);

  const handleCategoryClick = (catKey) => {
    setActiveCategory(catKey);
    setView('category');
    setSearchTerm('');
  };

  const handleManualClick = (manual) => {
    if (isAdmin) {
      startEdit(manual);
    } else {
      setActiveManual(manual);
      setView('manual');
    }
  };

  // Allow admin to preview without editing
  const handleAdminPreview = (manual) => {
    setActiveManual(manual);
    setView('manual');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      setView('search');
    } else {
      setView('home');
    }
  };

  const goHome = () => {
    setView('home');
    setActiveCategory(null);
    setActiveManual(null);
    setSearchTerm('');
  };

  // Updated Toggle Logic with Modal
  const toggleAdmin = () => {
    if (!isAdmin) {
      setShowAuthModal(true);
    } else {
      setIsAdmin(false);
      goHome();
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'lccustom') {
      setIsAdmin(true);
      setShowAuthModal(false);
      setPasswordInput('');
      setAuthError(false);
      goHome();
    } else {
      setAuthError(true);
    }
  };

  const resetData = () => {
    if (
      window.confirm(
        'Factory Reset: This will erase all your changes and restore default manuals. Continue?'
      )
    ) {
      setAppData(INITIAL_DATA);
      setUserProgress({});
      localStorage.removeItem('lc_manuals_data');
      localStorage.removeItem('lc_user_progress');
    }
  };

  // --- AI Trigger Handler ---
  const handleAskAI = (query) => {
    setChatQuery(query);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      <Header
        onHome={goHome}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onAdminClick={toggleAdmin}
        isAdmin={isAdmin}
      />

      <main className="max-w-4xl mx-auto px-4 py-6 flex-grow w-full">
        {isAdmin && view === 'home' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex justify-between items-center animate-fade-in">
            <div>
              <h3 className="font-bold text-orange-800">Admin Mode Active</h3>
              <p className="text-sm text-orange-700">
                Select a category to add or edit manuals.
              </p>
            </div>
            <button
              onClick={resetData}
              className="text-xs bg-white border border-orange-200 text-orange-600 px-3 py-2 rounded hover:bg-orange-100 flex items-center"
            >
              <RefreshCw size={12} className="mr-1" /> Reset Data
            </button>
          </div>
        )}

        {/* VIEW: HOME (Categories) */}
        {view === 'home' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Trade Categories
              </h2>
              <p className="text-slate-500">
                Select an area to view standard procedures.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(appData).map((key) => (
                <CategoryCard
                  key={key}
                  categoryKey={key}
                  data={appData[key]}
                  onClick={handleCategoryClick}
                />
              ))}
              {/* Add Category Tile (Only visible in Admin Mode) */}
              {isAdmin && (
                <button
                  onClick={() => setView('admin-add-category')}
                  className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center hover:border-[#FFC947] hover:bg-slate-50 transition-all active:scale-95 group min-h-[160px]"
                >
                  <div className="p-4 rounded-full mb-3 bg-slate-100 text-slate-400 group-hover:bg-[#FFC947] group-hover:text-[#0C1A2A] transition-colors">
                    <Plus size={32} />
                  </div>
                  <h3 className="font-bold text-slate-500 group-hover:text-slate-800">
                    Add Category
                  </h3>
                </button>
              )}
            </div>
          </div>
        )}

        {/* VIEW: CATEGORY LIST */}
        {view === 'category' && activeCategory && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={goHome}
                className="flex items-center text-slate-500 text-sm font-medium hover:text-slate-800"
              >
                <ArrowLeft size={16} className="mr-1" /> Back to Trades
              </button>
              {isAdmin && (
                <button
                  onClick={() => startEdit(null)} // null means new manual
                  className="bg-[#0C1A2A] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center shadow-md hover:bg-[#1A2C42]"
                >
                  <Plus size={16} className="mr-1" /> Add Manual
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`p-3 rounded-lg ${appData[activeCategory].color}`}
              >
                {React.createElement(
                  ICON_MAP[appData[activeCategory].iconName],
                  { size: 24 }
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {appData[activeCategory].title}
                </h2>
                <p className="text-slate-500 text-sm">
                  {isAdmin
                    ? 'Tap a manual to edit it, or use the eye to preview'
                    : 'Select a procedure below'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {appData[activeCategory].manuals.map((manual) => (
                <ManualListItem
                  key={manual.id}
                  manual={manual}
                  onClick={handleManualClick}
                  isAdmin={isAdmin}
                  onDelete={handleDeleteManual}
                  onView={handleAdminPreview}
                  progress={userProgress[manual.id]}
                />
              ))}
              {appData[activeCategory].manuals.length === 0 && (
                <div className="text-center py-8 bg-slate-100 rounded-lg border border-dashed border-slate-300 text-slate-400">
                  No manuals in this category yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: MANUAL WIZARD (New Page-by-Page View) */}
        {view === 'manual' && activeManual && (
          <ManualWizard
            manual={activeManual}
            onBack={() =>
              searchTerm ? setView('search') : setView('category')
            }
            progress={userProgress[activeManual.id]}
            onToggleCheck={(index) =>
              handleChecklistToggle(activeManual.id, index)
            }
            onReset={() => handleResetChecklist(activeManual.id)}
            onAskAI={handleAskAI}
          />
        )}

        {/* VIEW: ADMIN EDIT FORM (MANUAL) */}
        {view === 'admin-edit' && (
          <AdminEditor
            manual={activeManual}
            onSave={handleUpdateManual}
            onCancel={() => setView('category')}
          />
        )}

        {/* VIEW: ADMIN ADD CATEGORY */}
        {view === 'admin-add-category' && (
          <CategoryEditor
            onSave={handleCreateCategory}
            onCancel={() => setView('home')}
          />
        )}

        {/* VIEW: SEARCH RESULTS */}
        {view === 'search' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {filteredManuals.length > 0
                ? `Found ${filteredManuals.length} results for "${searchTerm}"`
                : `No results found for "${searchTerm}"`}
            </h2>

            <div className="space-y-2">
              {filteredManuals.map((manual) => (
                <div key={manual.id} className="relative">
                  <span className="absolute top-2 right-4 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    {manual.categoryTitle}
                  </span>
                  <ManualListItem
                    manual={manual}
                    onClick={(m) => {
                      setActiveCategory(manual.categoryKey);
                      handleManualClick(m);
                    }}
                    isAdmin={isAdmin}
                    onDelete={() =>
                      alert(
                        'Please go to the specific category to delete manuals.'
                      )
                    }
                    onView={(m) => {
                      setActiveCategory(manual.categoryKey);
                      handleAdminPreview(m);
                    }}
                    progress={userProgress[manual.id]}
                  />
                </div>
              ))}
            </div>

            {filteredManuals.length === 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto text-slate-300 mb-2" size={48} />
                <p className="text-slate-500">
                  Try adjusting your search terms.
                </p>
                <button
                  onClick={goHome}
                  className="text-orange-500 font-medium mt-2"
                >
                  Return Home
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* AI Chat Widget (Only visible when inside a category or manual) */}
      {(activeCategory || activeManual) && (
        <AIChatWidget
          categoryId={
            activeCategory ||
            (activeManual
              ? Object.keys(appData).find((key) =>
                  appData[key].manuals.find((m) => m.id === activeManual.id)
                )
              : 'default')
          }
          manualContext={activeManual ? activeManual.title : null}
          manualData={activeManual ? activeManual.content : null}
          externalQuery={chatQuery}
          onExternalQueryHandled={() => setChatQuery(null)}
        />
      )}

      {/* Admin Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-[#0C1A2A] p-4 text-center">
              <Lock className="text-white mx-auto mb-2" size={32} />
              <h3 className="text-white font-bold text-lg">Admin Access</h3>
            </div>
            <form onSubmit={handleAuthSubmit} className="p-6">
              <p className="text-slate-600 text-sm mb-4 text-center">
                Enter the site supervisor password to edit manuals.
              </p>
              <input
                type="password"
                autoFocus
                className={`w-full p-3 border rounded-lg outline-none transition-all mb-2 ${
                  authError
                    ? 'border-red-500 bg-red-50'
                    : 'border-slate-300 focus:border-[#FFC947]'
                }`}
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
              />
              {authError && (
                <p className="text-red-500 text-xs font-bold mb-4">
                  Incorrect password.
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    setPasswordInput('');
                    setAuthError(false);
                  }}
                  className="flex-1 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#0C1A2A] text-white rounded-lg font-bold hover:bg-[#1A2C42]"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer onAdminClick={toggleAdmin} isAdmin={isAdmin} />
    </div>
  );
};

export default App;
