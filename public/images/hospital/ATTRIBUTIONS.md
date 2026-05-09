# Image attributions — hospital photography

All facility, equipment, and clinical-area photographs in this directory are
© Dev Nandini Hospital, Hapur (DNH). They were photographed at the Dev Nandini
Hospital campus and originally published on the institution's own website,
[dnhhapur.com](https://dnhhapur.com/). DNH has authorised reuse on this site.

## Files

| File | Subject | Source |
|---|---|---|
| `west-wing.webp` | Hospital exterior — west wing at dawn | DNH (provided directly) |
| `opd-station.jpg` | General OPD nursing station with the duty team | DNH (dnhhapur.com / IMG_8767) |
| `laparoscopy.jpg` | Laparoscopic surgery in the operating theatre | DNH (dnhhapur.com / ot-12) |
| `nicu.jpg` | NICU incubator and monitoring equipment | DNH (dnhhapur.com / nicu-2) |
| `nicu-warmers.jpg` | NICU baby warmers in the neonatal unit | DNH (dnhhapur.com / nicu-3) |
| `nicu-team.jpg` | NICU clinical team caring for newborns | DNH (dnhhapur.com / 1.jpg) |
| `reception.jpg` | Test Tube Baby Centre reception and waiting area | DNH (dnhhapur.com / devnandini-5) |
| `surgery-team.jpg` | Surgical team in the operating theatre | DNH (dnhhapur.com / ot-1) |
| `ct-scanner.jpg` | CT scanner in the radiology department | DNH (dnhhapur.com / ecg-4) |
| `eye-exam.jpg` | Slit-lamp eye examination | DNH (dnhhapur.com / DSC_0878) |
| `pathology-lab.jpg` | Pathology laboratory bench | DNH (dnhhapur.com / IMG_8712) |

## Note on identifiable subjects

A subset of the source photographs include patients, family members, and
clinical staff who are recognisable. DNH has the underlying releases for
these images (they were already published on dnhhapur.com prior to this
work). If any individual asks for a photograph featuring them to be
removed, replace the file in this folder with a non-identifying alternative
(or with a `<PhotoPlaceholder>` gradient) and update this file accordingly.

## Replacing a photo

Files are referenced by path from:

- `components/home/PhotoStrip.tsx` (opd-station, laparoscopy, nicu)
- `components/home/VisitPanel.tsx` (reception)
- `components/home/Hero.tsx` (west-wing)
- `lib/departmentImagery.ts` (the rest, via the `POOL` constant)

If you change a filename, grep those four locations and update accordingly.
