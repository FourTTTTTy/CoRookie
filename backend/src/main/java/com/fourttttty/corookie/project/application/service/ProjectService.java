package com.fourttttty.corookie.project.application.service;

import com.fourttttty.corookie.member.application.repository.MemberRepository;
import com.fourttttty.corookie.member.application.service.MemberService;
import com.fourttttty.corookie.member.domain.Member;
import com.fourttttty.corookie.project.application.repository.ProjectRepository;
import com.fourttttty.corookie.project.domain.Project;
import com.fourttttty.corookie.project.dto.request.ProjectCreateRequest;
import com.fourttttty.corookie.project.dto.request.ProjectUpdateRequest;
import com.fourttttty.corookie.project.dto.response.ProjectResponse;
import com.fourttttty.corookie.textchannel.application.repository.TextChannelRepository;
import com.fourttttty.corookie.textchannel.application.service.TextChannelService;
import com.fourttttty.corookie.textchannel.domain.DefaultChannel;
import com.fourttttty.corookie.textchannel.domain.TextChannel;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final TextChannelRepository textChannelRepository;
    private final MemberRepository memberRepository;

    public List<ProjectResponse> findAll() {
        return projectRepository.findAll().stream()
                .map(ProjectResponse::from)
                .toList();
    }

    public ProjectResponse findById(Long projectId) {
        return ProjectResponse.from(findEntityById(projectId));
    }

    public Project findEntityById(Long projectId) {
        return projectRepository.findById(projectId).orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public ProjectResponse create(ProjectCreateRequest projectCreateRequest, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(EntityNotFoundException::new);
        String invitationLink = null;
        //To-Do : invitationLink 실제 링크 생성해서 넣기
        Project project = projectRepository.save(projectCreateRequest.toEntity(invitationLink, member));
        project.createDefaultTextChannels().forEach(textChannelRepository::save);
        return ProjectResponse.from(project);
    }

    @Transactional
    public ProjectResponse modify(ProjectUpdateRequest request, Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(EntityNotFoundException::new);
        project.update(request.name(), request.description(), request.invitationLink(), request.invitationStatus());
        return ProjectResponse.from(project);
    }

    @Transactional
    public void deleteById(Long projectId) {
        projectRepository.findById(projectId).orElseThrow(EntityNotFoundException::new).delete();
    }

}