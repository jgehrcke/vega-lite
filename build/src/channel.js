"use strict";
/*
 * Constants and utilities for encoding channels (Visual variables)
 * such as 'x', 'y', 'color'.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("./util");
var Channel;
(function (Channel) {
    // Facet
    Channel.ROW = 'row';
    Channel.COLUMN = 'column';
    // Position
    Channel.X = 'x';
    Channel.Y = 'y';
    Channel.X2 = 'x2';
    Channel.Y2 = 'y2';
    // Geo Position
    Channel.LATITUDE = 'latitude';
    Channel.LONGITUDE = 'longitude';
    Channel.LATITUDE2 = 'latitude2';
    Channel.LONGITUDE2 = 'longitude2';
    // Mark property with scale
    Channel.COLOR = 'color';
    Channel.FILL = 'fill';
    Channel.STROKE = 'stroke';
    Channel.SHAPE = 'shape';
    Channel.SIZE = 'size';
    Channel.OPACITY = 'opacity';
    // Non-scale channel
    Channel.TEXT = 'text';
    Channel.ORDER = 'order';
    Channel.DETAIL = 'detail';
    Channel.KEY = 'key';
    Channel.TOOLTIP = 'tooltip';
    Channel.HREF = 'href';
})(Channel = exports.Channel || (exports.Channel = {}));
exports.X = Channel.X;
exports.Y = Channel.Y;
exports.X2 = Channel.X2;
exports.Y2 = Channel.Y2;
exports.LATITUDE = Channel.LATITUDE;
exports.LATITUDE2 = Channel.LATITUDE2;
exports.LONGITUDE = Channel.LONGITUDE;
exports.LONGITUDE2 = Channel.LONGITUDE2;
exports.ROW = Channel.ROW;
exports.COLUMN = Channel.COLUMN;
exports.SHAPE = Channel.SHAPE;
exports.SIZE = Channel.SIZE;
exports.COLOR = Channel.COLOR;
exports.FILL = Channel.FILL;
exports.STROKE = Channel.STROKE;
exports.TEXT = Channel.TEXT;
exports.DETAIL = Channel.DETAIL;
exports.KEY = Channel.KEY;
exports.ORDER = Channel.ORDER;
exports.OPACITY = Channel.OPACITY;
exports.TOOLTIP = Channel.TOOLTIP;
exports.HREF = Channel.HREF;
exports.GEOPOSITION_CHANNEL_INDEX = {
    longitude: 1,
    longitude2: 1,
    latitude: 1,
    latitude2: 1,
};
exports.GEOPOSITION_CHANNELS = util_1.flagKeys(exports.GEOPOSITION_CHANNEL_INDEX);
var UNIT_CHANNEL_INDEX = tslib_1.__assign({ 
    // position
    x: 1, y: 1, x2: 1, y2: 1 }, exports.GEOPOSITION_CHANNEL_INDEX, { 
    // color
    color: 1, fill: 1, stroke: 1, 
    // other non-position with scale
    opacity: 1, size: 1, shape: 1, 
    // channels without scales
    order: 1, text: 1, detail: 1, key: 1, tooltip: 1, href: 1 });
function isColorChannel(channel) {
    return channel === 'color' || channel === 'fill' || channel === 'stroke';
}
exports.isColorChannel = isColorChannel;
var FACET_CHANNEL_INDEX = {
    row: 1,
    column: 1
};
var CHANNEL_INDEX = tslib_1.__assign({}, UNIT_CHANNEL_INDEX, FACET_CHANNEL_INDEX);
exports.CHANNELS = util_1.flagKeys(CHANNEL_INDEX);
var _o = CHANNEL_INDEX.order, _d = CHANNEL_INDEX.detail, SINGLE_DEF_CHANNEL_INDEX = tslib_1.__rest(CHANNEL_INDEX, ["order", "detail"]);
/**
 * Channels that cannot have an array of channelDef.
 * model.fieldDef, getFieldDef only work for these channels.
 *
 * (The only two channels that can have an array of channelDefs are "detail" and "order".
 * Since there can be multiple fieldDefs for detail and order, getFieldDef/model.fieldDef
 * are not applicable for them.  Similarly, selection projection won't work with "detail" and "order".)
 */
exports.SINGLE_DEF_CHANNELS = util_1.flagKeys(SINGLE_DEF_CHANNEL_INDEX);
function isChannel(str) {
    return !!CHANNEL_INDEX[str];
}
exports.isChannel = isChannel;
// CHANNELS without COLUMN, ROW
exports.UNIT_CHANNELS = util_1.flagKeys(UNIT_CHANNEL_INDEX);
// NONPOSITION_CHANNELS = UNIT_CHANNELS without X, Y, X2, Y2;
var _x = UNIT_CHANNEL_INDEX.x, _y = UNIT_CHANNEL_INDEX.y, 
// x2 and y2 share the same scale as x and y
_x2 = UNIT_CHANNEL_INDEX.x2, _y2 = UNIT_CHANNEL_INDEX.y2, _latitude = UNIT_CHANNEL_INDEX.latitude, _longitude = UNIT_CHANNEL_INDEX.longitude, _latitude2 = UNIT_CHANNEL_INDEX.latitude2, _longitude2 = UNIT_CHANNEL_INDEX.longitude2, 
// The rest of unit channels then have scale
NONPOSITION_CHANNEL_INDEX = tslib_1.__rest(UNIT_CHANNEL_INDEX, ["x", "y", "x2", "y2", "latitude", "longitude", "latitude2", "longitude2"]);
exports.NONPOSITION_CHANNELS = util_1.flagKeys(NONPOSITION_CHANNEL_INDEX);
// POSITION_SCALE_CHANNELS = X and Y;
var POSITION_SCALE_CHANNEL_INDEX = { x: 1, y: 1 };
exports.POSITION_SCALE_CHANNELS = util_1.flagKeys(POSITION_SCALE_CHANNEL_INDEX);
// NON_POSITION_SCALE_CHANNEL = SCALE_CHANNELS without X, Y
var 
// x2 and y2 share the same scale as x and y
// text and tooltip have format instead of scale,
// href has neither format, nor scale
_t = NONPOSITION_CHANNEL_INDEX.text, _tt = NONPOSITION_CHANNEL_INDEX.tooltip, _hr = NONPOSITION_CHANNEL_INDEX.href, 
// detail and order have no scale
_dd = NONPOSITION_CHANNEL_INDEX.detail, _k = NONPOSITION_CHANNEL_INDEX.key, _oo = NONPOSITION_CHANNEL_INDEX.order, NONPOSITION_SCALE_CHANNEL_INDEX = tslib_1.__rest(NONPOSITION_CHANNEL_INDEX, ["text", "tooltip", "href", "detail", "key", "order"]);
exports.NONPOSITION_SCALE_CHANNELS = util_1.flagKeys(NONPOSITION_SCALE_CHANNEL_INDEX);
// Declare SCALE_CHANNEL_INDEX
var SCALE_CHANNEL_INDEX = tslib_1.__assign({}, POSITION_SCALE_CHANNEL_INDEX, NONPOSITION_SCALE_CHANNEL_INDEX);
/** List of channels with scales */
exports.SCALE_CHANNELS = util_1.flagKeys(SCALE_CHANNEL_INDEX);
function isScaleChannel(channel) {
    return !!SCALE_CHANNEL_INDEX[channel];
}
exports.isScaleChannel = isScaleChannel;
/**
 * Return whether a channel supports a particular mark type.
 * @param channel  channel name
 * @param mark the mark type
 * @return whether the mark supports the channel
 */
function supportMark(channel, mark) {
    return mark in getSupportedMark(channel);
}
exports.supportMark = supportMark;
/**
 * Return a dictionary showing whether a channel supports mark type.
 * @param channel
 * @return A dictionary mapping mark types to boolean values.
 */
function getSupportedMark(channel) {
    switch (channel) {
        case exports.COLOR:
        case exports.FILL:
        case exports.STROKE:
        case exports.DETAIL:
        case exports.KEY:
        case exports.TOOLTIP:
        case exports.HREF:
        case exports.ORDER: // TODO: revise (order might not support rect, which is not stackable?)
        case exports.OPACITY:
        case exports.ROW:
        case exports.COLUMN:
            return {
                point: true, tick: true, rule: true, circle: true, square: true,
                bar: true, rect: true, line: true, trail: true, area: true, text: true, geoshape: true
            };
        case exports.X:
        case exports.Y:
        case exports.LATITUDE:
        case exports.LONGITUDE:
            return {
                point: true, tick: true, rule: true, circle: true, square: true,
                bar: true, rect: true, line: true, trail: true, area: true, text: true
            };
        case exports.X2:
        case exports.Y2:
        case exports.LATITUDE2:
        case exports.LONGITUDE2:
            return {
                rule: true, bar: true, rect: true, area: true
            };
        case exports.SIZE:
            return {
                point: true, tick: true, rule: true, circle: true, square: true,
                bar: true, text: true, line: true, trail: true
            };
        case exports.SHAPE:
            return { point: true, geoshape: true };
        case exports.TEXT:
            return { text: true };
    }
}
exports.getSupportedMark = getSupportedMark;
function rangeType(channel) {
    switch (channel) {
        case exports.X:
        case exports.Y:
        case exports.SIZE:
        case exports.OPACITY:
        // X2 and Y2 use X and Y scales, so they similarly have continuous range.
        case exports.X2:
        case exports.Y2:
            return 'continuous';
        case exports.ROW:
        case exports.COLUMN:
        case exports.SHAPE:
        // TEXT, TOOLTIP, and HREF have no scale but have discrete output
        case exports.TEXT:
        case exports.TOOLTIP:
        case exports.HREF:
            return 'discrete';
        // Color can be either continuous or discrete, depending on scale type.
        case exports.COLOR:
        case exports.FILL:
        case exports.STROKE:
            return 'flexible';
        // No scale, no range type.
        case exports.LATITUDE:
        case exports.LONGITUDE:
        case exports.LATITUDE2:
        case exports.LONGITUDE2:
        case exports.DETAIL:
        case exports.KEY:
        case exports.ORDER:
            return undefined;
    }
    /* istanbul ignore next: should never reach here. */
    throw new Error('rangeType not implemented for ' + channel);
}
exports.rangeType = rangeType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7OztBQU1ILCtCQUFzQztBQUV0QyxJQUFpQixPQUFPLENBb0N2QjtBQXBDRCxXQUFpQixPQUFPO0lBQ3RCLFFBQVE7SUFDSyxXQUFHLEdBQVUsS0FBSyxDQUFDO0lBQ25CLGNBQU0sR0FBYSxRQUFRLENBQUM7SUFFekMsV0FBVztJQUNFLFNBQUMsR0FBUSxHQUFHLENBQUM7SUFDYixTQUFDLEdBQVEsR0FBRyxDQUFDO0lBQ2IsVUFBRSxHQUFTLElBQUksQ0FBQztJQUNoQixVQUFFLEdBQVMsSUFBSSxDQUFDO0lBRTdCLGVBQWU7SUFDRixnQkFBUSxHQUFlLFVBQVUsQ0FBQztJQUNsQyxpQkFBUyxHQUFnQixXQUFXLENBQUM7SUFDckMsaUJBQVMsR0FBZ0IsV0FBVyxDQUFDO0lBQ3JDLGtCQUFVLEdBQWlCLFlBQVksQ0FBQztJQUVyRCwyQkFBMkI7SUFDZCxhQUFLLEdBQVksT0FBTyxDQUFDO0lBRXpCLFlBQUksR0FBVyxNQUFNLENBQUM7SUFFdEIsY0FBTSxHQUFhLFFBQVEsQ0FBQztJQUU1QixhQUFLLEdBQVksT0FBTyxDQUFDO0lBQ3pCLFlBQUksR0FBVyxNQUFNLENBQUM7SUFDdEIsZUFBTyxHQUFjLFNBQVMsQ0FBQztJQUU1QyxvQkFBb0I7SUFDUCxZQUFJLEdBQVcsTUFBTSxDQUFDO0lBQ3RCLGFBQUssR0FBWSxPQUFPLENBQUM7SUFDekIsY0FBTSxHQUFhLFFBQVEsQ0FBQztJQUM1QixXQUFHLEdBQVUsS0FBSyxDQUFDO0lBRW5CLGVBQU8sR0FBYyxTQUFTLENBQUM7SUFDL0IsWUFBSSxHQUFXLE1BQU0sQ0FBQztBQUNyQyxDQUFDLEVBcENnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFvQ3ZCO0FBSVksUUFBQSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNk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WixLQUFLLGFBQUssQ0FBQztRQUNYLGlFQUFpRTtRQUNqRSxLQUFLLFlBQUksQ0FBQztRQUNWLEtBQUssZUFBTyxDQUFDO1FBQ2IsS0FBSyxZQUFJO1lBQ1AsT0FBTyxVQUFVLENBQUM7UUFFcEIsdUVBQXVFO1FBQ3ZFLEtBQUssYUFBSyxDQUFDO1FBQ1gsS0FBSyxZQUFJLENBQUM7UUFDVixLQUFLLGNBQU07WUFDVCxPQUFPLFVBQVUsQ0FBQztRQUVwQiwyQkFBMkI7UUFFM0IsS0FBSyxnQkFBUSxDQUFDO1FBQ2QsS0FBSyxpQkFBUyxDQUFDO1FBQ2YsS0FBSyxpQkFBUyxDQUFDO1FBQ2YsS0FBSyxrQkFBVSxDQUFDO1FBQ2hCLEtBQUssY0FBTSxDQUFDO1FBQ1osS0FBSyxXQUFHLENBQUM7UUFDVCxLQUFLLGFBQUs7WUFDUixPQUFPLFNBQVMsQ0FBQztLQUNwQjtJQUNELG9EQUFvRDtJQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQzlELENBQUM7QUF2Q0QsOEJBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBlbmNvZGluZyBjaGFubmVscyAoVmlzdWFsIHZhcmlhYmxlcylcbiAqIHN1Y2ggYXMgJ3gnLCAneScsICdjb2xvcicuXG4gKi9cblxuaW1wb3J0IHtSYW5nZVR5cGV9IGZyb20gJy4vY29tcGlsZS9zY2FsZS90eXBlJztcbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGYWNldE1hcHBpbmd9IGZyb20gJy4vZmFjZXQnO1xuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtGbGFnLCBmbGFnS2V5c30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDaGFubmVsIHtcbiAgLy8gRmFjZXRcbiAgZXhwb3J0IGNvbnN0IFJPVzogJ3JvdycgPSAncm93JztcbiAgZXhwb3J0IGNvbnN0IENPTFVNTjogJ2NvbHVtbicgPSAnY29sdW1uJztcblxuICAvLyBQb3NpdGlvblxuICBleHBvcnQgY29uc3QgWDogJ3gnID0gJ3gnO1xuICBleHBvcnQgY29uc3QgWTogJ3knID0gJ3knO1xuICBleHBvcnQgY29uc3QgWDI6ICd4MicgPSAneDInO1xuICBleHBvcnQgY29uc3QgWTI6ICd5MicgPSAneTInO1xuXG4gIC8vIEdlbyBQb3NpdGlvblxuICBleHBvcnQgY29uc3QgTEFUSVRVREU6ICdsYXRpdHVkZScgPSAnbGF0aXR1ZGUnO1xuICBleHBvcnQgY29uc3QgTE9OR0lUVURFOiAnbG9uZ2l0dWRlJyA9ICdsb25naXR1ZGUnO1xuICBleHBvcnQgY29uc3QgTEFUSVRVREUyOiAnbGF0aXR1ZGUyJyA9ICdsYXRpdHVkZTInO1xuICBleHBvcnQgY29uc3QgTE9OR0lUVURFMjogJ2xvbmdpdHVkZTInID0gJ2xvbmdpdHVkZTInO1xuXG4gIC8vIE1hcmsgcHJvcGVydHkgd2l0aCBzY2FsZVxuICBleHBvcnQgY29uc3QgQ09MT1I6ICdjb2xvcicgPSAnY29sb3InO1xuXG4gIGV4cG9ydCBjb25zdCBGSUxMOiAnZmlsbCcgPSAnZmlsbCc7XG5cbiAgZXhwb3J0IGNvbnN0IFNUUk9LRTogJ3N0cm9rZScgPSAnc3Ryb2tlJztcblxuICBleHBvcnQgY29uc3QgU0hBUEU6ICdzaGFwZScgPSAnc2hhcGUnO1xuICBleHBvcnQgY29uc3QgU0laRTogJ3NpemUnID0gJ3NpemUnO1xuICBleHBvcnQgY29uc3QgT1BBQ0lUWTogJ29wYWNpdHknID0gJ29wYWNpdHknO1xuXG4gIC8vIE5vbi1zY2FsZSBjaGFubmVsXG4gIGV4cG9ydCBjb25zdCBURVhUOiAndGV4dCcgPSAndGV4dCc7XG4gIGV4cG9ydCBjb25zdCBPUkRFUjogJ29yZGVyJyA9ICdvcmRlcic7XG4gIGV4cG9ydCBjb25zdCBERVRBSUw6ICdkZXRhaWwnID0gJ2RldGFpbCc7XG4gIGV4cG9ydCBjb25zdCBLRVk6ICdrZXknID0gJ2tleSc7XG5cbiAgZXhwb3J0IGNvbnN0IFRPT0xUSVA6ICd0b29sdGlwJyA9ICd0b29sdGlwJztcbiAgZXhwb3J0IGNvbnN0IEhSRUY6ICdocmVmJyA9ICdocmVmJztcbn1cblxuZXhwb3J0IHR5cGUgQ2hhbm5lbCA9IGtleW9mIEVuY29kaW5nPGFueT4gfCBrZXlvZiBGYWNldE1hcHBpbmc8YW55PjtcblxuZXhwb3J0IGNvbnN0IFggPSBDaGFubmVsLlg7XG5leHBvcnQgY29uc3QgWSA9IENoYW5uZWwuWTtcbmV4cG9ydCBjb25zdCBYMiA9IENoYW5uZWwuWDI7XG5leHBvcnQgY29uc3QgWTIgPSBDaGFubmVsLlkyO1xuXG5leHBvcnQgY29uc3QgTEFUSVRVREUgPSBDaGFubmVsLkxBVElUVURFO1xuZXhwb3J0IGNvbnN0IExBVElUVURFMiA9IENoYW5uZWwuTEFUSVRVREUyO1xuZXhwb3J0IGNvbnN0IExPTkdJVFVERSA9IENoYW5uZWwuTE9OR0lUVURFO1xuZXhwb3J0IGNvbnN0IExPTkdJVFVERTIgPSBDaGFubmVsLkxPTkdJVFVERTI7XG5cbmV4cG9ydCBjb25zdCBST1cgPSBDaGFubmVsLlJPVztcbmV4cG9ydCBjb25zdCBDT0xVTU4gPSBDaGFubmVsLkNPTFVNTjtcbmV4cG9ydCBjb25zdCBTSEFQRSA9IENoYW5uZWwuU0hBUEU7XG5leHBvcnQgY29uc3QgU0laRSA9IENoYW5uZWwuU0laRTtcbmV4cG9ydCBjb25zdCBDT0xPUiA9IENoYW5uZWwuQ09MT1I7XG5cbmV4cG9ydCBjb25zdCBGSUxMID0gQ2hhbm5lbC5GSUxMO1xuZXhwb3J0IGNvbnN0IFNUUk9LRSA9IENoYW5uZWwuU1RST0tFO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBDaGFubmVsLlRFWFQ7XG5leHBvcnQgY29uc3QgREVUQUlMID0gQ2hhbm5lbC5ERVRBSUw7XG5leHBvcnQgY29uc3QgS0VZID0gQ2hhbm5lbC5LRVk7XG5leHBvcnQgY29uc3QgT1JERVIgPSBDaGFubmVsLk9SREVSO1xuZXhwb3J0IGNvbnN0IE9QQUNJVFkgPSBDaGFubmVsLk9QQUNJVFk7XG5leHBvcnQgY29uc3QgVE9PTFRJUCA9IENoYW5uZWwuVE9PTFRJUDtcbmV4cG9ydCBjb25zdCBIUkVGID0gQ2hhbm5lbC5IUkVGO1xuXG5leHBvcnQgdHlwZSBHZW9Qb3NpdGlvbkNoYW5uZWwgPSAnbG9uZ2l0dWRlJyB8ICdsYXRpdHVkZScgfCAnbG9uZ2l0dWRlMicgfCAnbGF0aXR1ZGUyJztcblxuZXhwb3J0IGNvbnN0IEdFT1BPU0lUSU9OX0NIQU5ORUxfSU5ERVg6IEZsYWc8R2VvUG9zaXRpb25DaGFubmVsPiA9IHtcbiAgbG9uZ2l0dWRlOiAxLFxuICBsb25naXR1ZGUyOiAxLFxuICBsYXRpdHVkZTogMSxcbiAgbGF0aXR1ZGUyOiAxLFxufTtcblxuZXhwb3J0IGNvbnN0IEdFT1BPU0lUSU9OX0NIQU5ORUxTID0gZmxhZ0tleXMoR0VPUE9TSVRJT05fQ0hBTk5FTF9JTkRFWCk7XG5cbmNvbnN0IFVOSVRfQ0hBTk5FTF9JTkRFWDogRmxhZzxrZXlvZiBFbmNvZGluZzxhbnk+PiA9IHtcbiAgLy8gcG9zaXRpb25cbiAgeDogMSxcbiAgeTogMSxcbiAgeDI6IDEsXG4gIHkyOiAxLFxuXG4gIC4uLkdFT1BPU0lUSU9OX0NIQU5ORUxfSU5ERVgsXG5cbiAgLy8gY29sb3JcbiAgY29sb3I6IDEsXG4gIGZpbGw6IDEsXG4gIHN0cm9rZTogMSxcblxuICAvLyBvdGhlciBub24tcG9zaXRpb24gd2l0aCBzY2FsZVxuICBvcGFjaXR5OiAxLFxuICBzaXplOiAxLFxuICBzaGFwZTogMSxcblxuICAvLyBjaGFubmVscyB3aXRob3V0IHNjYWxlc1xuICBvcmRlcjogMSxcbiAgdGV4dDogMSxcbiAgZGV0YWlsOiAxLFxuICBrZXk6IDEsXG4gIHRvb2x0aXA6IDEsXG4gIGhyZWY6IDEsXG59O1xuXG5leHBvcnQgdHlwZSBDb2xvckNoYW5uZWwgPSAnY29sb3InIHwgJ2ZpbGwnIHwgJ3N0cm9rZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbG9yQ2hhbm5lbChjaGFubmVsOiBDaGFubmVsKTogY2hhbm5lbCBpcyBDb2xvckNoYW5uZWwge1xuICByZXR1cm4gY2hhbm5lbCA9PT0gJ2NvbG9yJyB8fCBjaGFubmVsID09PSAnZmlsbCcgfHwgY2hhbm5lbCA9PT0gJ3N0cm9rZSc7XG59XG5cbmNvbnN0IEZBQ0VUX0NIQU5ORUxfSU5ERVg6IEZsYWc8a2V5b2YgRmFjZXRNYXBwaW5nPGFueT4+ID0ge1xuICByb3c6IDEsXG4gIGNvbHVtbjogMVxufTtcblxuY29uc3QgQ0hBTk5FTF9JTkRFWCA9IHtcbiAgLi4uVU5JVF9DSEFOTkVMX0lOREVYLFxuICAuLi5GQUNFVF9DSEFOTkVMX0lOREVYXG59O1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTFMgPSBmbGFnS2V5cyhDSEFOTkVMX0lOREVYKTtcblxuY29uc3Qge29yZGVyOiBfbywgZGV0YWlsOiBfZCwgLi4uU0lOR0xFX0RFRl9DSEFOTkVMX0lOREVYfSA9IENIQU5ORUxfSU5ERVg7XG4vKipcbiAqIENoYW5uZWxzIHRoYXQgY2Fubm90IGhhdmUgYW4gYXJyYXkgb2YgY2hhbm5lbERlZi5cbiAqIG1vZGVsLmZpZWxkRGVmLCBnZXRGaWVsZERlZiBvbmx5IHdvcmsgZm9yIHRoZXNlIGNoYW5uZWxzLlxuICpcbiAqIChUaGUgb25seSB0d28gY2hhbm5lbHMgdGhhdCBjYW4gaGF2ZSBhbiBhcnJheSBvZiBjaGFubmVsRGVmcyBhcmUgXCJkZXRhaWxcIiBhbmQgXCJvcmRlclwiLlxuICogU2luY2UgdGhlcmUgY2FuIGJlIG11bHRpcGxlIGZpZWxkRGVmcyBmb3IgZGV0YWlsIGFuZCBvcmRlciwgZ2V0RmllbGREZWYvbW9kZWwuZmllbGREZWZcbiAqIGFyZSBub3QgYXBwbGljYWJsZSBmb3IgdGhlbS4gIFNpbWlsYXJseSwgc2VsZWN0aW9uIHByb2plY3Rpb24gd29uJ3Qgd29yayB3aXRoIFwiZGV0YWlsXCIgYW5kIFwib3JkZXJcIi4pXG4gKi9cblxuZXhwb3J0IGNvbnN0IFNJTkdMRV9ERUZfQ0hBTk5FTFM6IFNpbmdsZURlZkNoYW5uZWxbXSA9IGZsYWdLZXlzKFNJTkdMRV9ERUZfQ0hBTk5FTF9JTkRFWCk7XG5cbi8vIFVzaW5nIHRoZSBmb2xsb3dpbmcgbGluZSBsZWFkcyB0byBUeXBlRXJyb3I6IENhbm5vdCByZWFkIHByb3BlcnR5ICdlbGVtZW50VHlwZXMnIG9mIHVuZGVmaW5lZFxuLy8gd2hlbiBydW5uaW5nIHRoZSBzY2hlbWEgZ2VuZXJhdG9yXG4vLyBleHBvcnQgdHlwZSBTaW5nbGVEZWZDaGFubmVsID0gdHlwZW9mIFNJTkdMRV9ERUZfQ0hBTk5FTFNbMF07XG5leHBvcnQgdHlwZSBTaW5nbGVEZWZDaGFubmVsID0gJ3gnIHwgJ3knIHwgJ3gyJyB8ICd5MicgfFxuICAnbG9uZ2l0dWRlJyB8ICdsYXRpdHVkZScgfCAnbG9uZ2l0dWRlMicgfCAnbGF0aXR1ZGUyJyB8XG4gICdyb3cnIHwgJ2NvbHVtbicgfFxuICAnY29sb3InIHwgJ2ZpbGwnIHwgJ3N0cm9rZScgfFxuICAnc2l6ZScgfCAnc2hhcGUnIHwgJ29wYWNpdHknIHxcbiAgJ3RleHQnIHwgJ3Rvb2x0aXAnIHwgJ2hyZWYnIHwgJ2tleSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NoYW5uZWwoc3RyOiBzdHJpbmcpOiBzdHIgaXMgQ2hhbm5lbCB7XG4gIHJldHVybiAhIUNIQU5ORUxfSU5ERVhbc3RyXTtcbn1cblxuLy8gQ0hBTk5FTFMgd2l0aG91dCBDT0xVTU4sIFJPV1xuZXhwb3J0IGNvbnN0IFVOSVRfQ0hBTk5FTFMgPSBmbGFnS2V5cyhVTklUX0NIQU5ORUxfSU5ERVgpO1xuXG5cbi8vIE5PTlBPU0lUSU9OX0NIQU5ORUxTID0gVU5JVF9DSEFOTkVMUyB3aXRob3V0IFgsIFksIFgyLCBZMjtcbmNvbnN0IHtcbiAgeDogX3gsIHk6IF95LFxuICAvLyB4MiBhbmQgeTIgc2hhcmUgdGhlIHNhbWUgc2NhbGUgYXMgeCBhbmQgeVxuICB4MjogX3gyLCB5MjogX3kyLFxuICBsYXRpdHVkZTogX2xhdGl0dWRlLCBsb25naXR1ZGU6IF9sb25naXR1ZGUsXG4gIGxhdGl0dWRlMjogX2xhdGl0dWRlMiwgbG9uZ2l0dWRlMjogX2xvbmdpdHVkZTIsXG4gIC8vIFRoZSByZXN0IG9mIHVuaXQgY2hhbm5lbHMgdGhlbiBoYXZlIHNjYWxlXG4gIC4uLk5PTlBPU0lUSU9OX0NIQU5ORUxfSU5ERVhcbn0gPSBVTklUX0NIQU5ORUxfSU5ERVg7XG5cbmV4cG9ydCBjb25zdCBOT05QT1NJVElPTl9DSEFOTkVMUyA9IGZsYWdLZXlzKE5PTlBPU0lUSU9OX0NIQU5ORUxfSU5ERVgpO1xuZXhwb3J0IHR5cGUgTm9uUG9zaXRpb25DaGFubmVsID0gdHlwZW9mIE5PTlBPU0lUSU9OX0NIQU5ORUxTWzBdO1xuXG4vLyBQT1NJVElPTl9TQ0FMRV9DSEFOTkVMUyA9IFggYW5kIFk7XG5jb25zdCBQT1NJVElPTl9TQ0FMRV9DSEFOTkVMX0lOREVYOiB7eDoxLCB5OjF9ID0ge3g6MSwgeToxfTtcbmV4cG9ydCBjb25zdCBQT1NJVElPTl9TQ0FMRV9DSEFOTkVMUyA9IGZsYWdLZXlzKFBPU0lUSU9OX1NDQUxFX0NIQU5ORUxfSU5ERVgpO1xuZXhwb3J0IHR5cGUgUG9zaXRpb25TY2FsZUNoYW5uZWwgPSB0eXBlb2YgUE9TSVRJT05fU0NBTEVfQ0hBTk5FTFNbMF07XG5cbi8vIE5PTl9QT1NJVElPTl9TQ0FMRV9DSEFOTkVMID0gU0NBTEVfQ0hBTk5FTFMgd2l0aG91dCBYLCBZXG5jb25zdCB7XG4gIC8vIHgyIGFuZCB5MiBzaGFyZSB0aGUgc2FtZSBzY2FsZSBhcyB4IGFuZCB5XG4gIC8vIHRleHQgYW5kIHRvb2x0aXAgaGF2ZSBmb3JtYXQgaW5zdGVhZCBvZiBzY2FsZSxcbiAgLy8gaHJlZiBoYXMgbmVpdGhlciBmb3JtYXQsIG5vciBzY2FsZVxuICB0ZXh0OiBfdCwgdG9vbHRpcDogX3R0LCBocmVmOiBfaHIsXG4gIC8vIGRldGFpbCBhbmQgb3JkZXIgaGF2ZSBubyBzY2FsZVxuICBkZXRhaWw6IF9kZCwga2V5OiBfaywgb3JkZXI6IF9vbyxcbiAgLi4uTk9OUE9TSVRJT05fU0NBTEVfQ0hBTk5FTF9JTkRFWFxufSA9IE5PTlBPU0lUSU9OX0NIQU5ORUxfSU5ERVg7XG5leHBvcnQgY29uc3QgTk9OUE9TSVRJT05fU0NBTEVfQ0hBTk5FTFMgPSBmbGFnS2V5cyhOT05QT1NJVElPTl9TQ0FMRV9DSEFOTkVMX0lOREVYKTtcbmV4cG9ydCB0eXBlIE5vblBvc2l0aW9uU2NhbGVDaGFubmVsID0gdHlwZW9mIE5PTlBPU0lUSU9OX1NDQUxFX0NIQU5ORUxTWzBdO1xuXG4vLyBEZWNsYXJlIFNDQUxFX0NIQU5ORUxfSU5ERVhcbmNvbnN0IFNDQUxFX0NIQU5ORUxfSU5ERVggPSB7XG4gIC4uLlBPU0lUSU9OX1NDQUxFX0NIQU5ORUxfSU5ERVgsXG4gIC4uLk5PTlBPU0lUSU9OX1NDQUxFX0NIQU5ORUxfSU5ERVhcbn07XG5cbi8qKiBMaXN0IG9mIGNoYW5uZWxzIHdpdGggc2NhbGVzICovXG5leHBvcnQgY29uc3QgU0NBTEVfQ0hBTk5FTFMgPSBmbGFnS2V5cyhTQ0FMRV9DSEFOTkVMX0lOREVYKTtcbmV4cG9ydCB0eXBlIFNjYWxlQ2hhbm5lbCA9IHR5cGVvZiBTQ0FMRV9DSEFOTkVMU1swXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2NhbGVDaGFubmVsKGNoYW5uZWw6IENoYW5uZWwpOiBjaGFubmVsIGlzIFNjYWxlQ2hhbm5lbCB7XG4gIHJldHVybiAhIVNDQUxFX0NIQU5ORUxfSU5ERVhbY2hhbm5lbF07XG59XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZE1hcmsgPSB7XG4gIFttYXJrIGluIE1hcmtdPzogYm9vbGVhblxufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgYSBwYXJ0aWN1bGFyIG1hcmsgdHlwZS5cbiAqIEBwYXJhbSBjaGFubmVsICBjaGFubmVsIG5hbWVcbiAqIEBwYXJhbSBtYXJrIHRoZSBtYXJrIHR5cGVcbiAqIEByZXR1cm4gd2hldGhlciB0aGUgbWFyayBzdXBwb3J0cyB0aGUgY2hhbm5lbFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydE1hcmsoY2hhbm5lbDogQ2hhbm5lbCwgbWFyazogTWFyaykge1xuICByZXR1cm4gbWFyayBpbiBnZXRTdXBwb3J0ZWRNYXJrKGNoYW5uZWwpO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGRpY3Rpb25hcnkgc2hvd2luZyB3aGV0aGVyIGEgY2hhbm5lbCBzdXBwb3J0cyBtYXJrIHR5cGUuXG4gKiBAcGFyYW0gY2hhbm5lbFxuICogQHJldHVybiBBIGRpY3Rpb25hcnkgbWFwcGluZyBtYXJrIHR5cGVzIHRvIGJvb2xlYW4gdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwcG9ydGVkTWFyayhjaGFubmVsOiBDaGFubmVsKTogU3VwcG9ydGVkTWFyayB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBGSUxMOlxuICAgIGNhc2UgU1RST0tFOlxuXG4gICAgY2FzZSBERVRBSUw6XG4gICAgY2FzZSBLRVk6XG4gICAgY2FzZSBUT09MVElQOlxuICAgIGNhc2UgSFJFRjpcbiAgICBjYXNlIE9SREVSOiAgICAvLyBUT0RPOiByZXZpc2UgKG9yZGVyIG1pZ2h0IG5vdCBzdXBwb3J0IHJlY3QsIHdoaWNoIGlzIG5vdCBzdGFja2FibGU/KVxuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICAgIHJldHVybiB7IC8vIGFsbCBtYXJrc1xuICAgICAgICBwb2ludDogdHJ1ZSwgdGljazogdHJ1ZSwgcnVsZTogdHJ1ZSwgY2lyY2xlOiB0cnVlLCBzcXVhcmU6IHRydWUsXG4gICAgICAgIGJhcjogdHJ1ZSwgcmVjdDogdHJ1ZSwgbGluZTogdHJ1ZSwgdHJhaWw6IHRydWUsIGFyZWE6IHRydWUsIHRleHQ6IHRydWUsIGdlb3NoYXBlOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgWDpcbiAgICBjYXNlIFk6XG4gICAgY2FzZSBMQVRJVFVERTpcbiAgICBjYXNlIExPTkdJVFVERTpcbiAgICAgIHJldHVybiB7IC8vIGFsbCBtYXJrcyBleGNlcHQgZ2Vvc2hhcGUuIGdlb3NoYXBlIGRvZXMgbm90IHVzZSBYLCBZIC0tIGl0IHVzZXMgYSBwcm9qZWN0aW9uXG4gICAgICAgIHBvaW50OiB0cnVlLCB0aWNrOiB0cnVlLCBydWxlOiB0cnVlLCBjaXJjbGU6IHRydWUsIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgYmFyOiB0cnVlLCByZWN0OiB0cnVlLCBsaW5lOiB0cnVlLCB0cmFpbDogdHJ1ZSwgYXJlYTogdHJ1ZSwgdGV4dDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFgyOlxuICAgIGNhc2UgWTI6XG4gICAgY2FzZSBMQVRJVFVERTI6XG4gICAgY2FzZSBMT05HSVRVREUyOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcnVsZTogdHJ1ZSwgYmFyOiB0cnVlLCByZWN0OiB0cnVlLCBhcmVhOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgU0laRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBvaW50OiB0cnVlLCB0aWNrOiB0cnVlLCBydWxlOiB0cnVlLCBjaXJjbGU6IHRydWUsIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgYmFyOiB0cnVlLCB0ZXh0OiB0cnVlLCBsaW5lOiB0cnVlLCB0cmFpbDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHtwb2ludDogdHJ1ZSwgZ2Vvc2hhcGU6IHRydWV9O1xuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiB7dGV4dDogdHJ1ZX07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlVHlwZShjaGFubmVsOiBDaGFubmVsKTogUmFuZ2VUeXBlIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICBjYXNlIFNJWkU6XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgIC8vIFgyIGFuZCBZMiB1c2UgWCBhbmQgWSBzY2FsZXMsIHNvIHRoZXkgc2ltaWxhcmx5IGhhdmUgY29udGludW91cyByYW5nZS5cbiAgICBjYXNlIFgyOlxuICAgIGNhc2UgWTI6XG4gICAgICByZXR1cm4gJ2NvbnRpbnVvdXMnO1xuXG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSEFQRTpcbiAgICAvLyBURVhULCBUT09MVElQLCBhbmQgSFJFRiBoYXZlIG5vIHNjYWxlIGJ1dCBoYXZlIGRpc2NyZXRlIG91dHB1dFxuICAgIGNhc2UgVEVYVDpcbiAgICBjYXNlIFRPT0xUSVA6XG4gICAgY2FzZSBIUkVGOlxuICAgICAgcmV0dXJuICdkaXNjcmV0ZSc7XG5cbiAgICAvLyBDb2xvciBjYW4gYmUgZWl0aGVyIGNvbnRpbnVvdXMgb3IgZGlzY3JldGUsIGRlcGVuZGluZyBvbiBzY2FsZSB0eXBlLlxuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBGSUxMOlxuICAgIGNhc2UgU1RST0tFOlxuICAgICAgcmV0dXJuICdmbGV4aWJsZSc7XG5cbiAgICAvLyBObyBzY2FsZSwgbm8gcmFuZ2UgdHlwZS5cblxuICAgIGNhc2UgTEFUSVRVREU6XG4gICAgY2FzZSBMT05HSVRVREU6XG4gICAgY2FzZSBMQVRJVFVERTI6XG4gICAgY2FzZSBMT05HSVRVREUyOlxuICAgIGNhc2UgREVUQUlMOlxuICAgIGNhc2UgS0VZOlxuICAgIGNhc2UgT1JERVI6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBzaG91bGQgbmV2ZXIgcmVhY2ggaGVyZS4gKi9cbiAgdGhyb3cgbmV3IEVycm9yKCdyYW5nZVR5cGUgbm90IGltcGxlbWVudGVkIGZvciAnICsgY2hhbm5lbCk7XG59XG4iXX0=