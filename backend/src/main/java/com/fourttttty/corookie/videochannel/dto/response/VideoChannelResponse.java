package com.fourttttty.corookie.videochannel.dto.response;

import com.fourttttty.corookie.videochannel.domain.VideoChannel;
import lombok.Builder;

@Builder
public record VideoChannelResponse(String name) {

    public static VideoChannelResponse from(VideoChannel videoChannel) {
        return VideoChannelResponse.builder()
                .name(videoChannel.getChannelName())
                .build();
    }
}
