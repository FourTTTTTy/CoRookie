package com.fourttttty.corookie.project.domain;

import com.fourttttty.corookie.global.audit.BaseTime;
import com.fourttttty.corookie.member.domain.Member;
import com.fourttttty.corookie.textchannel.domain.DefaultChannel;
import com.fourttttty.corookie.textchannel.domain.TextChannel;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "project")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Project extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean enabled;

    @Column(nullable = false)
    private String invitationLink;

    @Column(nullable = false)
    private Boolean invitationStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private Project(String name,
                   String description,
                   Boolean enabled,
                   String invitationLink,
                   Boolean invitationStatus,
                   Member member) {
        this.name = name;
        this.description = description;
        this.enabled = enabled;
        this.invitationLink = invitationLink;
        this.invitationStatus = invitationStatus;
        this.member = member;
    }

    public static Project of(String name,
                             String description,
                             Boolean enabled,
                             String invitationLink,
                             Boolean invitationStatus,
                             Member member) {
        return new Project(name,
                description,
                enabled,
                invitationLink,
                invitationStatus,
                member);
    }

    public void update(String name,
                       String description,
                       String invitationLink,
                       Boolean invitationStatus) {
        this.name = name;
        this.description = description;
        this.invitationLink = invitationLink;
        this.invitationStatus = invitationStatus;
    }

    public void delete() {
        this.enabled = false;
    }

    public List<TextChannel> createDefaultTextChannels() {
        List<TextChannel> defaultChannels = new ArrayList<>();
        for (DefaultChannel channel : DefaultChannel.values()) {
            TextChannel textChannel = TextChannel.of(channel.getChannelName(), true, false, this);
            textChannel.changeNotDeletableChannel();
            defaultChannels.add(textChannel);
        }

        return defaultChannels;
    }
}