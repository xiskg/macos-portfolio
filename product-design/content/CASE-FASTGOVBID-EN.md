# One opportunity, from search to proposal

FastGovBid

I designed product interfaces for businesses pursuing government contracts, from finding an opportunity to preparing a response. The work spans search, the pursuit pipeline, proposal authoring and the product systems around them.

**My role:** Product and interface design

**Team:** Go Creative Studios, with product stakeholders and engineers

**Year:** 2026

**Scope:** Interaction design, information architecture, visual design and engineering handoff

## Following the work

Finding a contract is only the start. A business has to judge whether the work fits, check what the buyer requires, decide whether it can respond in time, and keep the details together while preparing a proposal.

I designed how those steps connect in FastGovBid. This case covers three parts of that work: search, pursuit tracking and proposal authoring. A single 60-second video follows an opportunity from the eligibility picker through its detail page and the Pipeline, into proposal writing with its source documents.

*Animated walkthrough of intended interactions, using demonstration data.*

## My contribution

I designed and revised the interfaces, explored alternate directions, worked through states and behavior with the team, and prepared files and guidance for engineering. The work also covered onboarding, documents, account settings, administration and the visual system.

I designed the product interfaces and interactions; engineers built and integrated the application. Other areas shown here include design proposals.

Three decisions show the range of the design work.

## What informed the design

I worked within an existing application, scoped product briefs and review conversations with product and engineering. In the proposal flow, some states were difficult to reach without completing earlier steps. I requested a runnable version, then used the supplied mock flow to inspect those states while revising the screens.

Project briefs, design records, delivery files and implementation discussions informed these decisions. A task-based evaluation with people who prepare bids is the next step described at the end of the case.

## At a glance

**Proposal workspace.** V3 design files delivered on May 11, 2026; engineering confirmed the implementation was merged on May 21. The document preview remained a follow-up.

**Search.** The August 4 decision record pairs a guided sentence with Advanced search and specifies one shared query. This case shows the design and an isolated demonstration of that rule.

**Prime List.** The September 3 brief changed the object from a time-based opportunity to a prime contractor with related awards. The resulting interfaces are a design proposal.

## Search that keeps its place

Government contracting has its own vocabulary. Someone new to the process may know the kind of work and the places they serve, but not which classification codes to enter. An experienced bid manager may want those codes and detailed filters immediately.

I explored several ways into search, including a sentence builder, inbox-style concepts, decision cards, advanced search and a filter rail. The direction I developed pairs a guided sentence with Advanced search. The sentence lets people describe work, location, deadline and eligibility in familiar terms; Advanced search offers more direct controls.

I specified both modes around one query so filters remain consistent across views. The sentence cannot express every filter, so conditions selected in Advanced stay applied and appear beneath the sentence on return. The design also remembers the last-used mode; saved searches stay intact across views.

Both views keep the same essentials in the result: the work, the buyer, time remaining and an eligibility indication.

The tradeoff was maintaining two ways into the same search. I kept the sentence as the entry point and direct filters available on request. The inbox concept was parked, but its email digest carried forward; the faceted rail contributed its live-count logic without becoming the main layout. The design record still leaves the switch placement and email deep-link behavior open.

*The guided and Advanced views work from one query. Conditions that do not fit the sentence remain visible when someone switches back.*

## A proposal workspace for the unfinished draft

Proposal writing rarely moves in a straight line. A person may check a requirement, draft one section, look for source material and return to a section that still needs work. The interface needed to support that back-and-forth without making the document's state hard to read.

I organized the workspace around the active section: an outline for document structure, a main writing canvas and a contextual panel for assistance and sources. Section states and a review step show unfinished work; saved drafts provide a way back. The FastGovBid navigation stays in place, keeping the editor within the same product.

Engineering feedback refined the panel order: AI assistance first, Sources in a separate tab, and Preview reserved for the document view. I also asked for a runnable version of the existing flow to inspect states that were difficult to reach in the application.

Engineering incorporated the workspace redesign into the codebase, with Document Preview left as a follow-up. The film illustrates the intended preview interaction as a prototype.

## From review to implementation

**April 15 — keeping a way back.** Product feedback singled out the saved-at state and raised the need for a Proposal drafts page so people could return to unfinished work.

**May 4 — inspecting the actual states.** The team supplied a runnable mock flow after I asked for access to screens that were hard to reach in the application. It gave the design review a concrete reference beyond isolated screenshots.

**May 11 — handing over V3.** I delivered the revised design files after posting the authoring, empty, personnel, analysis and review states, and preparing Tailwind exports for engineering.

**May 21 — integration confirmed.** Engineering recorded the merged editor workspace, including the outline, writing canvas, contextual tabs and normal application sidebar. Document Preview remained a follow-up. Production release and usage results have not been verified for this case.

*The design keeps the outline, active draft and contextual panel in view together, with section states showing where work remains.*

## Reframing partner discovery

Partner discovery began as Teaming Radar, an exploration organized around the timing of potential teaming opportunities. When the requirements changed, I reworked the direction as Prime List: a catalog of prime contractors—companies that hold government contracts—with awards grouped beneath each company.

The revised brief called for browsing that works before a person creates a company profile. I separated Browse, the open catalog, from For You, personalized recommendations based on a shared matching profile. This keeps profile setup from blocking exploration and makes the difference between browsing and matching visible in the interface.

The available contract data also shaped the language. A recorded end date can show when the longest listed contract term ends; it cannot establish that a company is recruiting subcontractors or will rebid. I designed the timing information as a dated record with its source and freshness visible, without turning it into a prediction about the company's next move.

The work covers loading, empty, stale-data and provider-error states, and distinguishes following a company personally from saving it as an organization lead. Prime List remains a design proposal.

The important concession was giving up the earlier timing-led story when the brief and available data no longer supported it. The company became the primary object, awards became supporting evidence, and the interface stopped presenting a recorded contract end date as a prediction. One information-architecture question remains open: keeping the pricing catalog and teaming catalog distinct in navigation.

*Browse is available without a profile. For You adds recommendations, with source and data freshness kept in view.*

## The systems around the journey

The central flow sits within a broader set of product interfaces I designed:

**Onboarding and settings.** Workspace setup covers company targeting, personal preferences and paths for joining or switching organizations. Settings separate individual choices from organization controls.

**Documents and access.** Folder sharing, uploads and file details make access legible, including inherited folder permissions and the state a person sees when opening a private link without permission.

**Capability Statement.** I proposed an editing flow that starts with company information already in the profile, then asks for what is missing. On desktop, the document stays beside the questions; mobile uses a separate preview.

**Industry news.** The V4 proposal rebuilds the feed around images, topic tags and a visible reason each story is relevant. It also specifies attribution and fallbacks when an image or feed fails.

**Shared visual system.** Tokens, reusable components, light and dark themes, and common navigation give these interfaces a consistent foundation. I prepared implementation guidance and exports for engineering.

## What I would look at next

Across the work, I focused on keeping key context in view: the search design preserves filters across modes, section states identify unfinished work, and company records state only what the available data supports.

To evaluate the connected journey, I would ask someone to find an eligible opportunity, switch search modes, add it to a pursuit, open its source material and resume an unfinished proposal section. I would watch for lost filters, unclear access and places where they have to reconstruct context. This evaluation remains to be done.

Before that session, I would confirm which screens are available in the current build and recruit people who actually prepare bids. The first round would use three tasks: preserve a search while changing modes; recover an unfinished proposal; and identify who can open a shared folder. I would record completion, points requiring help and misunderstandings, then revise the flow. Those are proposed measures, not results from a study already run.

## Let's talk

If you're hiring for a product design role, I'd be glad to talk about this work and how I could contribute.

**Get in touch** · **View resume**
