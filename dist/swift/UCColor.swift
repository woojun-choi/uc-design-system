// 자동 생성 — 직접 고치지 마세요. 원본: tokens/ → npm run tokens
import SwiftUI
import UIKit

/// 테마 하나의 semantic 색. 다크 모드·대비 높이기 설정을 따라 자동 전환된다.
public struct UCColors: Sendable {
    public let bgLayer1: Color
    public let bgLayer2: Color
    public let bgLayer3: Color
    public let bgOverlay: Color
    public let bgNeutralSolid: Color
    public let bgNeutralSolidHover: Color
    public let bgNeutralSolidPressed: Color
    public let bgNeutralWeak: Color
    public let bgNeutralWeakHover: Color
    public let bgNeutralWeakPressed: Color
    public let bgBrandSolid: Color
    public let bgBrandSolidHover: Color
    public let bgBrandSolidPressed: Color
    public let bgBrandWeak: Color
    public let bgBrandWeakHover: Color
    public let bgBrandWeakPressed: Color
    public let bgDangerSolid: Color
    public let bgDangerSolidHover: Color
    public let bgDangerSolidPressed: Color
    public let bgDangerWeak: Color
    public let bgDangerWeakHover: Color
    public let bgDangerWeakPressed: Color
    public let bgSuccessSolid: Color
    public let bgSuccessSolidHover: Color
    public let bgSuccessSolidPressed: Color
    public let bgSuccessWeak: Color
    public let bgSuccessWeakHover: Color
    public let bgSuccessWeakPressed: Color
    public let bgWarningSolid: Color
    public let bgWarningSolidHover: Color
    public let bgWarningSolidPressed: Color
    public let bgWarningWeak: Color
    public let bgWarningWeakHover: Color
    public let bgWarningWeakPressed: Color
    public let bgInfoSolid: Color
    public let bgInfoSolidHover: Color
    public let bgInfoSolidPressed: Color
    public let bgInfoWeak: Color
    public let bgInfoWeakHover: Color
    public let bgInfoWeakPressed: Color
    public let fgDefault: Color
    public let fgMuted: Color
    public let fgSubtle: Color
    public let fgDisabled: Color
    public let fgNeutral: Color
    public let fgOnNeutral: Color
    public let fgBrand: Color
    public let fgOnBrand: Color
    public let fgDanger: Color
    public let fgOnDanger: Color
    public let fgSuccess: Color
    public let fgOnSuccess: Color
    public let fgWarning: Color
    public let fgOnWarning: Color
    public let fgInfo: Color
    public let fgOnInfo: Color
    public let strokeDefault: Color
    public let strokeStrong: Color
    public let strokeFocus: Color
    public let strokeDanger: Color
}

extension UCColors {
    public static let neutral = UCColors(
        bgLayer1: .uc(0xFFFFFFFF, 0x171717FF, 0xFFFFFFFF, 0x171717FF),
        bgLayer2: .uc(0xF9F9F9FF, 0x1C1C1CFF, 0xF7F7F8FF, 0x1E1E1EFF),
        bgLayer3: .uc(0xEEEEEEFF, 0x242424FF, 0xE9E9E9FF, 0x282828FF),
        bgOverlay: .uc(0x00000066, 0x000000A6, 0x00000066, 0x000000A6),
        bgNeutralSolid: .uc(0x272727FF, 0xEBEAEBFF, 0x030303FF, 0xFFFFFFFF),
        bgNeutralSolidHover: .uc(0x3C3C3CFF, 0xCBCACBFF, 0x272727FF, 0xEBEAEBFF),
        bgNeutralSolidPressed: .uc(0x515051FF, 0xAEADAEFF, 0x3D3D3DFF, 0xC9C8C9FF),
        bgNeutralWeak: .uc(0xEEEEEEFF, 0x242424FF, 0xE9E9E9FF, 0x282828FF),
        bgNeutralWeakHover: .uc(0xE1E1E1FF, 0x2D2D2DFF, 0xD8D8D8FF, 0x333333FF),
        bgNeutralWeakPressed: .uc(0xCCCCCCFF, 0x3B3B3BFF, 0xBFBFBFFF, 0x444444FF),
        bgBrandSolid: .uc(0x4A6FE1FF, 0x3F65DDFF, 0x365AD3FF, 0x385BD5FF),
        bgBrandSolidHover: .uc(0x3658D2FF, 0x2C4CC4FF, 0x2643BBFF, 0x3D4861FF),
        bgBrandSolidPressed: .uc(0x2643BBFF, 0x2C4CC4FF, 0x172DA4FF, 0x3D4861FF),
        bgBrandWeak: .uc(0xE9EFFDFF, 0x202940FF, 0xE1E9FDFF, 0x232C44FF),
        bgBrandWeakHover: .uc(0xD7E2FBFF, 0x28324AFF, 0xCAD8FAFF, 0x2E3750FF),
        bgBrandWeakPressed: .uc(0xB9CCF8FF, 0x353F58FF, 0xA7BEF5FF, 0x3D4861FF),
        bgDangerSolid: .uc(0xD4433BFF, 0xC93832FF, 0xBD2C28FF, 0xBF2E2AFF),
        bgDangerSolidHover: .uc(0xBC2A27FF, 0xAE181AFF, 0xA40510FF, 0x60413CFF),
        bgDangerSolidPressed: .uc(0xA40510FF, 0xAE181AFF, 0x810000FF, 0x60413CFF),
        bgDangerWeak: .uc(0xFEEAE8FF, 0x3B1F1BFF, 0xFDE4E1FF, 0x3F231EFF),
        bgDangerWeakHover: .uc(0xFCD9D5FF, 0x452823FF, 0xFACEC8FF, 0x4D2F2AFF),
        bgDangerWeakPressed: .uc(0xF7BFB7FF, 0x563732FF, 0xF4AEA4FF, 0x60413CFF),
        bgSuccessSolid: .uc(0x088846FF, 0x007F3DFF, 0x007533FF, 0x007634FF),
        bgSuccessSolidHover: .uc(0x007331FF, 0x006625FF, 0x005F1EFF, 0x324732FF),
        bgSuccessSolidPressed: .uc(0x005F1EFF, 0x006625FF, 0x004805FF, 0x324732FF),
        bgSuccessWeak: .uc(0xE6F2E9FF, 0x152814FF, 0xDEEEE1FF, 0x182B17FF),
        bgSuccessWeakHover: .uc(0xD0E7D5FF, 0x1D311CFF, 0xC2E0C9FF, 0x233721FF),
        bgSuccessWeakPressed: .uc(0xADD6B7FF, 0x2A3E29FF, 0x98CBA5FF, 0x324732FF),
        bgWarningSolid: .uc(0xD79800FF, 0xDDA336FF, 0xE5B86DFF, 0xE9C385FF),
        bgWarningSolidHover: .uc(0xEBC78EFF, 0xC88900FF, 0xF0D4A8FF, 0xDDA336FF),
        bgWarningSolidPressed: .uc(0xBA7C00FF, 0xEAC58AFF, 0xC48600FF, 0xF8E9D3FF),
        bgWarningWeak: .uc(0xF9EEDCFF, 0x391E16FF, 0xF7E8D0FF, 0x3E2319FF),
        bgWarningWeakHover: .uc(0xF3DEBCFF, 0x43281DFF, 0xF0D4A8FF, 0x492E22FF),
        bgWarningWeakPressed: .uc(0xEBC78EFF, 0x513728FF, 0xE5B86DFF, 0x5A402FFF),
        bgInfoSolid: .uc(0x2775D9FF, 0x1C6CCFFF, 0x0C62C4FF, 0x0E64C5FF),
        bgInfoSolidHover: .uc(0x0961C2FF, 0x0054B4FF, 0x004CABFF, 0x38475FFF),
        bgInfoSolidPressed: .uc(0x004CABFF, 0x0054B4FF, 0x003594FF, 0x38475FFF),
        bgInfoWeak: .uc(0xE7F0FDFF, 0x1D283EFF, 0xDFEBFCFF, 0x1F2B41FF),
        bgInfoWeakHover: .uc(0xD1E3FBFF, 0x243047FF, 0xC4DAF9FF, 0x2A364EFF),
        bgInfoWeakPressed: .uc(0xB1CFF7FF, 0x313E56FF, 0x9CC1F4FF, 0x38475FFF),
        fgDefault: .uc(0x272727FF, 0xEBEAEBFF, 0x030303FF, 0xFFFFFFFF),
        fgMuted: .uc(0x515051FF, 0xAEADAEFF, 0x3D3D3DFF, 0xC9C8C9FF),
        fgSubtle: .uc(0x636363FF, 0x969596FF, 0x515051FF, 0xAEADAEFF),
        fgDisabled: .uc(0xA3A3A4FF, 0x575757FF, 0x929292FF, 0x656566FF),
        fgNeutral: .uc(0x272727FF, 0xEBEAEBFF, 0x030303FF, 0xFFFFFFFF),
        fgOnNeutral: .uc(0xFFFFFFFF, 0x171717FF, 0xFFFFFFFF, 0x171717FF),
        fgBrand: .uc(0x3658D2FF, 0x91ACF1FF, 0x2643BBFF, 0xB5C9F7FF),
        fgOnBrand: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        fgDanger: .uc(0xBC2A27FF, 0xEE968BFF, 0xA40510FF, 0xF7BAB3FF),
        fgOnDanger: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        fgSuccess: .uc(0x007331FF, 0x79BC8CFF, 0x005F1EFF, 0xA8D3B3FF),
        fgOnSuccess: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        fgWarning: .uc(0x905500FF, 0xDDA336FF, 0x7B4100FF, 0xE9C385FF),
        fgOnWarning: .uc(0x161616FF, 0x171717FF, 0x000000FF, 0x171717FF),
        fgInfo: .uc(0x0961C2FF, 0x81AFF0FF, 0x004CABFF, 0xACCBF6FF),
        fgOnInfo: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        strokeDefault: .uc(0xE1E1E1FF, 0x2D2D2DFF, 0x929292FF, 0x656566FF),
        strokeStrong: .uc(0x898989FF, 0x6D6D6DFF, 0x767677FF, 0x807F80FF),
        strokeFocus: .uc(0x4A6FE1FF, 0x5579E4FF, 0x365AD3FF, 0x6F91EAFF),
        strokeDanger: .uc(0xD4433BFF, 0xDA5249FF, 0xBD2C28FF, 0xE47267FF)
    )

    public static let paper = UCColors(
        bgLayer1: .uc(0xF4ECDAFF, 0x1E1A14FF, 0xF4ECDAFF, 0x1E1A14FF),
        bgLayer2: .uc(0xEFE7D4FF, 0x231F19FF, 0xEDE5D2FF, 0x24201AFF),
        bgLayer3: .uc(0xE6DDCAFF, 0x2A2620FF, 0xE0D8C5FF, 0x2E2A24FF),
        bgOverlay: .uc(0x00000066, 0x000000A6, 0x00000066, 0x000000A6),
        bgNeutralSolid: .uc(0x1C1813FF, 0xF5EEDFFF, 0x000000FF, 0xFFFFFFFF),
        bgNeutralSolidHover: .uc(0x353129FF, 0xD7CDBAFF, 0x1C1813FF, 0xF5EEDFFF),
        bgNeutralSolidPressed: .uc(0x4D463AFF, 0xBAAF9BFF, 0x37322BFF, 0xD5CBB8FF),
        bgNeutralWeak: .uc(0xE6DDCAFF, 0x2A2620FF, 0xE0D8C5FF, 0x2E2A24FF),
        bgNeutralWeakHover: .uc(0xD9D0BDFF, 0x342F28FF, 0xD1C7B3FF, 0x3A352DFF),
        bgNeutralWeakPressed: .uc(0xC6BCA8FF, 0x433D33FF, 0xB9AF9AFF, 0x4D453AFF),
        bgBrandSolid: .uc(0xA3563DFF, 0xA75C44FF, 0x934126FF, 0xA15138FF),
        bgBrandSolidHover: .uc(0x914025FF, 0x934227FF, 0x7B2C10FF, 0x604238FF),
        bgBrandSolidPressed: .uc(0x7B2C10FF, 0x934227FF, 0x641500FF, 0x604238FF),
        bgBrandWeak: .uc(0xEDDAD4FF, 0x3E211CFF, 0xEAD3CCFF, 0x422520FF),
        bgBrandWeakHover: .uc(0xE6CBC2FF, 0x482B24FF, 0xE1C2B8FF, 0x4E3128FF),
        bgBrandWeakPressed: .uc(0xDAB4A8FF, 0x563930FF, 0xD2A697FF, 0x604238FF),
        bgDangerSolid: .uc(0xC63630FF, 0xCC3B35FF, 0xB01B1CFF, 0xC2312CFF),
        bgDangerSolidHover: .uc(0xAF191AFF, 0xB01C1CFF, 0x920000FF, 0x62433EFF),
        bgDangerSolidPressed: .uc(0x920000FF, 0xB01C1CFF, 0x6D0000FF, 0x62433EFF),
        bgDangerWeak: .uc(0xFBD4CFFF, 0x3D211DFF, 0xFACEC8FF, 0x422521FF),
        bgDangerWeakHover: .uc(0xF9C5BEFF, 0x492B27FF, 0xF6B9B0FF, 0x4F312CFF),
        bgDangerWeakPressed: .uc(0xF3AAA0FF, 0x583935FF, 0xEF9A8FFF, 0x62433EFF),
        bgSuccessSolid: .uc(0x007C3BFF, 0x00813FFF, 0x006828FF, 0x007837FF),
        bgSuccessSolidHover: .uc(0x006727FF, 0x006828FF, 0x005211FF, 0x344A35FF),
        bgSuccessSolidPressed: .uc(0x005211FF, 0x006828FF, 0x003D00FF, 0x344A35FF),
        bgSuccessWeak: .uc(0xC9E4CFFF, 0x182B16FF, 0xC2E0C9FF, 0x1B2E19FF),
        bgSuccessWeakHover: .uc(0xB4D9BDFF, 0x20331EFF, 0xA6D2B1FF, 0x263924FF),
        bgSuccessWeakPressed: .uc(0x92C9A0FF, 0x2D412CFF, 0x7DBE8FFF, 0x344A35FF),
        bgWarningSolid: .uc(0xC98A00FF, 0xDEA743FF, 0xDEA640FF, 0xEBC78EFF),
        bgWarningSolidHover: .uc(0xE4B669FF, 0xCB8C00FF, 0xE9C283FF, 0xDEA743FF),
        bgWarningSolidPressed: .uc(0xAD7000FF, 0xECC992FF, 0xB77900FF, 0xF9EDDBFF),
        bgWarningWeak: .uc(0xF2DAB4FF, 0x3C2118FF, 0xF0D4A8FF, 0x41251BFF),
        bgWarningWeakHover: .uc(0xEDCC98FF, 0x462B1FFF, 0xE9C283FF, 0x4C3124FF),
        bgWarningWeakPressed: .uc(0xE4B669FF, 0x53392AFF, 0xDEA640FF, 0x5C4331FF),
        bgInfoSolid: .uc(0x186ACCFF, 0x1F6FD2FF, 0x0056B7FF, 0x1266C8FF),
        bgInfoSolidHover: .uc(0x0055B6FF, 0x0057B7FF, 0x003F9EFF, 0x3A4961FF),
        bgInfoSolidPressed: .uc(0x003F9EFF, 0x0057B7FF, 0x002887FF, 0x3A4961FF),
        bgInfoWeak: .uc(0xCCDFFAFF, 0x1F2A41FF, 0xC4DAF9FF, 0x222D45FF),
        bgInfoWeakHover: .uc(0xB7D2F8FF, 0x26324AFF, 0xA9CAF6FF, 0x2C3850FF),
        bgInfoWeakPressed: .uc(0x99BFF4FF, 0x324058FF, 0x86B3F0FF, 0x3A4961FF),
        fgDefault: .uc(0x1C1813FF, 0xF5EEDFFF, 0x000000FF, 0xFFFFFFFF),
        fgMuted: .uc(0x4D463AFF, 0xBAAF9BFF, 0x37322BFF, 0xD5CBB8FF),
        fgSubtle: .uc(0x615748FF, 0xA29781FF, 0x4D463AFF, 0xBAAF9BFF),
        fgDisabled: .uc(0xA1957FFF, 0x625949FF, 0x91846EFF, 0x716754FF),
        fgNeutral: .uc(0x1C1813FF, 0xF5EEDFFF, 0x000000FF, 0xFFFFFFFF),
        fgOnNeutral: .uc(0xF4ECDAFF, 0x1E1A14FF, 0xF4ECDAFF, 0x1E1A14FF),
        fgBrand: .uc(0x914025FF, 0xD3A698FF, 0x7B2C10FF, 0xE4C6BDFF),
        fgOnBrand: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        fgDanger: .uc(0xAF191AFF, 0xEF9A90FF, 0x920000FF, 0xF7BFB8FF),
        fgOnDanger: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        fgSuccess: .uc(0x006727FF, 0x7EBE8FFF, 0x005211FF, 0xAED6B8FF),
        fgOnSuccess: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        fgWarning: .uc(0x854A00FF, 0xDEA743FF, 0x703600FF, 0xEBC78EFF),
        fgOnWarning: .uc(0x000000FF, 0x1E1A14FF, 0x000000FF, 0x1E1A14FF),
        fgInfo: .uc(0x0055B6FF, 0x86B3F0FF, 0x003F9EFF, 0xB1CEF7FF),
        fgOnInfo: .uc(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF),
        strokeDefault: .uc(0xD9D0BDFF, 0x342F28FF, 0x91846EFF, 0x716754FF),
        strokeStrong: .uc(0x887B65FF, 0x7A6F5BFF, 0x756A57FF, 0x8D806AFF),
        strokeFocus: .uc(0xA3563DFF, 0xB4715BFF, 0x934126FF, 0xC28977FF),
        strokeDanger: .uc(0xC63630FF, 0xDB574DFF, 0xB01B1CFF, 0xE5766BFF)
    )
}

extension Color {
    /// 값은 0xRRGGBBAA. 순서: 라이트, 다크, 라이트 고대비, 다크 고대비
    static func uc(_ light: UInt32, _ dark: UInt32, _ lightHC: UInt32, _ darkHC: UInt32) -> Color {
        Color(uiColor: UIColor { t in
            let hc = t.accessibilityContrast == .high
            switch (t.userInterfaceStyle == .dark, hc) {
            case (false, false): return .ucHex(light)
            case (true, false): return .ucHex(dark)
            case (false, true): return .ucHex(lightHC)
            case (true, true): return .ucHex(darkHC)
            }
        })
    }
}

private extension UIColor {
    static func ucHex(_ v: UInt32) -> UIColor {
        UIColor(
            red: CGFloat((v >> 24) & 0xFF) / 255,
            green: CGFloat((v >> 16) & 0xFF) / 255,
            blue: CGFloat((v >> 8) & 0xFF) / 255,
            alpha: CGFloat(v & 0xFF) / 255
        )
    }
}
