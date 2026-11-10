import type { DischargeNote, KitState, MohContent } from '../../types'
import { selectedContent } from '../../lib/matching'
import SehhatyApp from './SehhatyApp'

interface Props {
  note: DischargeNote
  kit: KitState
  library: MohContent[]
}

/** The patient's Sehhaty app, centred on its own. The case shown follows the case selected in the hospital portal. */
export default function PatientView({ note, kit, library }: Props) {
  return (
    <div className="flex justify-center px-4 py-6">
      {/* Keyed so in-app tab/checklist state resets per patient and on publish. */}
      <SehhatyApp key={note.id + kit.status} note={note} kit={kit} content={selectedContent(kit.selectedContentIds, library)} />
    </div>
  )
}
